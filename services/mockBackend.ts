
import { Role, User, ApiResponse } from '../types';

/**
 * PRODUCTION NOTE:
 * In a real production environment, this entire file would be a separate Node.js/Express server.
 * This mock mimics that behavior precisely, including status codes, delays, and stateful tracking.
 */

interface MockUserDB extends User {
  passwordHash: string;
}

class MockBackend {
  private users: MockUserDB[] = [
    {
      id: 'u1',
      email: 'admin@example.com',
      name: 'System Admin',
      role: Role.ADMIN,
      passwordHash: 'hashed_password_123',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'u2',
      email: 'user@example.com',
      name: 'Regular User',
      role: Role.USER,
      passwordHash: 'hashed_password_456',
      createdAt: new Date().toISOString(),
    }
  ];

  private currentToken: string | null = localStorage.getItem('auth_token');

  // Simulate network delay
  private async delay(ms = 800) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Auth Controller: Registration
  async register(name: string, email: string, pass: string): Promise<ApiResponse<{user: User, token: string}>> {
    await this.delay();
    if (this.users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser: MockUserDB = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: Role.USER,
      passwordHash: `hashed_${pass}`, // In real app: bcrypt.hash(pass, 12)
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    const token = `jwt_token_${newUser.id}`;
    localStorage.setItem('auth_token', token);
    this.currentToken = token;

    return { 
      success: true, 
      data: { 
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, createdAt: newUser.createdAt }, 
        token 
      } 
    };
  }

  // Auth Controller: Login
  async login(email: string, pass: string): Promise<ApiResponse<{user: User, token: string}>> {
    await this.delay();
    const user = this.users.find(u => u.email === email);
    
    // Security: Don't reveal if user doesn't exist to prevent enumeration
    if (!user || user.passwordHash !== `hashed_${pass}`) {
      return { success: false, message: 'Invalid credentials provided' };
    }

    const token = `jwt_token_${user.id}`;
    localStorage.setItem('auth_token', token);
    this.currentToken = token;

    return { 
      success: true, 
      data: { 
        user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }, 
        token 
      } 
    };
  }

  // Middleware: Auth Check
  async getCurrentUser(): Promise<ApiResponse<{user: User, token: string}>> {
    await this.delay(200);
    const token = this.currentToken || localStorage.getItem('auth_token');
    if (!token) return { success: false, message: 'No session' };

    const userId = token.replace('jwt_token_', '');
    const user = this.users.find(u => u.id === userId);

    if (!user) return { success: false, message: 'Session invalid' };

    return { 
      success: true, 
      data: { 
        user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }, 
        token 
      } 
    };
  }

  // Auth Controller: Password Management
  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    await this.delay();
    // In production, we would always return "success" to prevent email discovery,
    // but here we check for demo purposes.
    const user = this.users.find(u => u.email === email);
    if (!user) {
        // Still return success to prevent user enumeration attacks
        return { success: true, message: "If that email exists, a link was sent" };
    }
    return { success: true };
  }

  async resetPassword(token: string, newPass: string): Promise<ApiResponse<null>> {
    await this.delay();
    // Simulate finding user by token
    if (this.users.length > 0) {
        this.users[0].passwordHash = `hashed_${newPass}`;
        return { success: true };
    }
    return { success: false, message: "Invalid or expired token" };
  }

  async logout() {
    localStorage.removeItem('auth_token');
    this.currentToken = null;
  }

  // Protected Resource Controller
  async getUserLogs(): Promise<ApiResponse<any[]>> {
    await this.delay();
    if (!this.currentToken) return { success: false, message: 'Unauthorized' };

    return {
      success: true,
      data: [
        { event: 'Login Successful', ip: '192.168.1.104', device: 'Chrome / MacOS', time: 'Today, 10:45 AM', status: 'success' },
        { event: 'Token Rotation', ip: '192.168.1.104', device: 'Chrome / MacOS', time: 'Today, 10:30 AM', status: 'success' },
        { event: 'API Access', ip: '192.168.1.104', device: 'Chrome / MacOS', time: 'Today, 09:15 AM', status: 'success' },
        { event: 'Failed Login Attempt', ip: '45.12.19.2', device: 'Firefox / Linux', time: 'Yesterday, 11:20 PM', status: 'failed' },
      ]
    };
  }
}

export const backendApi = new MockBackend();
