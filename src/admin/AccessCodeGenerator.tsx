// ================================================
// ACCESS CODE GENERATOR COMPONENT
// Allows managers to generate codes for staff
// ================================================

import { useState } from 'react';
import { 
  createAccessCode, 
  getCodesCreatedBy, 
  deactivateAccessCode,
  AccessCode 
} from '@/lib/accessCodes';

interface AccessCodeGeneratorProps {
  managerEmail: string;
  managerName: string;
}

export default function AccessCodeGenerator({ managerEmail, managerName: _managerName }: AccessCodeGeneratorProps) {
  const [selectedRole, setSelectedRole] = useState<'receptionist' | 'staff'>('receptionist');
  const [generatedCodes, setGeneratedCodes] = useState<AccessCode[]>([]);
  const [showCodes, setShowCodes] = useState(false);

  const handleGenerateCode = () => {
    const newCode = createAccessCode(selectedRole, managerEmail);
    setGeneratedCodes(prev => [newCode, ...prev]);
    loadExistingCodes();
  };

  const handleDeactivateCode = (code: string) => {
    if (confirm('Are you sure you want to deactivate this access code?')) {
      deactivateAccessCode(code);
      loadExistingCodes();
    }
  };

  const loadExistingCodes = () => {
    const codes = getCodesCreatedBy(managerEmail);
    setGeneratedCodes(codes);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Access code copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Access Code Generator</h3>
          <p className="text-sm text-slate-500">Create codes for new staff members</p>
        </div>
        <button
          onClick={() => {
            loadExistingCodes();
            setShowCodes(!showCodes);
          }}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-sm font-medium"
        >
          {showCodes ? 'Hide' : 'View'} Codes
        </button>
      </div>

      {/* Code Generator */}
      <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as 'receptionist' | 'staff')}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="receptionist">Receptionist</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <button
            onClick={handleGenerateCode}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all shadow-md"
          >
            🔑 Generate
          </button>
        </div>
      </div>

      {/* Generated Codes List */}
      {showCodes && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-700">Your Generated Codes</h4>
            <span className="text-xs text-slate-500">{generatedCodes.length} active codes</span>
          </div>
          
          {generatedCodes.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm">No codes generated yet</p>
              <p className="text-xs mt-1">Generate a code to get started</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {generatedCodes.map((code) => (
                <div
                  key={code.code}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-teal-300 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {code.code}
                      </code>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        code.role === 'receptionist' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {code.role}
                      </span>
                      {code.usedBy && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                          ✓ Used
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      Created {new Date(code.createdAt).toLocaleDateString()} at {new Date(code.createdAt).toLocaleTimeString()}
                      {code.usedBy && ` • Used by ${code.usedBy}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!code.usedBy && (
                      <>
                        <button
                          onClick={() => copyToClipboard(code.code)}
                          className="px-3 py-1.5 bg-teal-100 text-teal-700 rounded hover:bg-teal-200 transition text-xs font-medium"
                          title="Copy code"
                        >
                          📋 Copy
                        </button>
                        <button
                          onClick={() => handleDeactivateCode(code.code)}
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-medium"
                          title="Deactivate code"
                        >
                          ✕
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800 font-medium mb-2">📌 How it works:</p>
        <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
          <li>Generate a unique code for each new staff member</li>
          <li>Share the code securely with the staff member</li>
          <li>They'll use it during signup to create their account</li>
          <li>Each code can only be used once</li>
          <li>You can deactivate unused codes anytime</li>
        </ul>
      </div>
    </div>
  );
}
