// ================================================
// ACCESS CODE MANAGEMENT SYSTEM
// Self-generated codes stored locally and cross-checked
// for admin portal access
// ================================================

export interface AccessCode {
  code: string;
  role: 'manager' | 'receptionist' | 'staff';
  createdBy: string;
  createdAt: string;
  isActive: boolean;
  usedBy?: string;
  usedAt?: string;
}

// Default manager code for first signup
export const DEFAULT_MANAGER_CODE = 'WGH-MGR-2026-INIT';

// Storage key for local access codes
const STORAGE_KEY = 'wgh_access_codes';

/**
 * Get all access codes from local storage
 */
export function getStoredAccessCodes(): AccessCode[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve access codes:', error);
    return [];
  }
}

/**
 * Save access codes to local storage
 */
export function saveAccessCodes(codes: AccessCode[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  } catch (error) {
    console.error('Failed to save access codes:', error);
  }
}

/**
 * Generate a new access code for a specific role
 */
export function generateAccessCode(
  role: 'manager' | 'receptionist' | 'staff'
): string {
  const rolePrefix: Record<string, string> = {
    manager: 'MGR',
    receptionist: 'RCPT',
    staff: 'STFF'
  };
  
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `WGH-${rolePrefix[role]}-${timestamp}-${random}`;
}

/**
 * Create and store a new access code
 */
export function createAccessCode(
  role: 'manager' | 'receptionist' | 'staff',
  createdBy: string
): AccessCode {
  const codes = getStoredAccessCodes();
  
  const newCode: AccessCode = {
    code: generateAccessCode(role),
    role,
    createdBy,
    createdAt: new Date().toISOString(),
    isActive: true
  };
  
  codes.push(newCode);
  saveAccessCodes(codes);
  
  return newCode;
}

/**
 * Validate an access code
 */
export function validateAccessCode(
  code: string,
  expectedRole?: 'manager' | 'receptionist' | 'staff'
): { valid: boolean; accessCode?: AccessCode; error?: string } {
  // Check default manager code
  if (code === DEFAULT_MANAGER_CODE) {
    return {
      valid: true,
      accessCode: {
        code: DEFAULT_MANAGER_CODE,
        role: 'manager',
        createdBy: 'system',
        createdAt: new Date().toISOString(),
        isActive: true
      }
    };
  }
  
  const codes = getStoredAccessCodes();
  const accessCode = codes.find(c => c.code === code);
  
  if (!accessCode) {
    return { valid: false, error: 'Invalid access code' };
  }
  
  if (!accessCode.isActive) {
    return { valid: false, error: 'Access code has been deactivated' };
  }
  
  if (accessCode.usedBy) {
    return { valid: false, error: 'Access code has already been used' };
  }
  
  if (expectedRole && accessCode.role !== expectedRole) {
    return { valid: false, error: `Access code is for ${accessCode.role} role, not ${expectedRole}` };
  }
  
  return { valid: true, accessCode };
}

/**
 * Mark an access code as used
 */
export function markAccessCodeAsUsed(code: string, usedBy: string): void {
  const codes = getStoredAccessCodes();
  const codeIndex = codes.findIndex(c => c.code === code);
  
  if (codeIndex !== -1) {
    codes[codeIndex].usedBy = usedBy;
    codes[codeIndex].usedAt = new Date().toISOString();
    saveAccessCodes(codes);
  }
}

/**
 * Deactivate an access code
 */
export function deactivateAccessCode(code: string): void {
  const codes = getStoredAccessCodes();
  const codeIndex = codes.findIndex(c => c.code === code);
  
  if (codeIndex !== -1) {
    codes[codeIndex].isActive = false;
    saveAccessCodes(codes);
  }
}

/**
 * Get all active codes created by a specific user
 */
export function getCodesCreatedBy(createdBy: string): AccessCode[] {
  const codes = getStoredAccessCodes();
  return codes.filter(c => c.createdBy === createdBy && c.isActive && !c.usedBy);
}

/**
 * Initialize default manager code if no codes exist
 */
export function initializeDefaultCodes(): void {
  if (typeof window === 'undefined') return;
  
  const codes = getStoredAccessCodes();
  if (codes.length === 0) {
    // Store reference to default manager code being available
    const defaultCode: AccessCode = {
      code: DEFAULT_MANAGER_CODE,
      role: 'manager',
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      isActive: true
    };
    saveAccessCodes([defaultCode]);
  }
}
