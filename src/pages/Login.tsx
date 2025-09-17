import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Calendar, Save, LogOut, Plus, Minus } from 'lucide-react';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [resetData, setResetData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [resetStep, setResetStep] = useState<'email' | 'verify' | 'password'>('email');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeExpiry, setCodeExpiry] = useState<number>(0);
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: 'projectparty2025'
  });
  const [newCredentials, setNewCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [availability, setAvailability] = useState({
    unavailableDates: [] as string[],
    message: 'We are currently booking events! Contact us to check availability for your date.'
  });
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showChangeCredentials, setShowChangeCredentials] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [dateToRemove, setDateToRemove] = useState<string | null>(null);
  const navigate = useNavigate();

  // Rate limiting constants
  const MAX_ATTEMPTS = 4;
  const BASE_BLOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

  // Input sanitization function
  const sanitizeInput = (input: string): string => {
    // Remove script and image tags (case insensitive)
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/<img\b[^>]*>/gi, '');
    sanitized = sanitized.replace(/<\/img>/gi, '');
    
    // Remove other potentially dangerous tags
    sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
    sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
    sanitized = sanitized.replace(/<embed\b[^>]*>/gi, '');
    
    return sanitized;
  };

  // Validate special characters (allow only @, -, _, . and alphanumeric)
  const validateSpecialChars = (input: string, isEmail: boolean = false): string => {
    if (isEmail) {
      // For email, allow standard email characters
      return input.replace(/[^a-zA-Z0-9@._-]/g, '');
    } else {
      // For other fields, allow basic special characters but remove most others
      return input.replace(/[^a-zA-Z0-9@._\-\s]/g, '');
    }
  };

  // Get user identifier (IP simulation using browser fingerprint)
  const getUserIdentifier = (): string => {
    // Create a simple browser fingerprint as IP substitute
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.textBaseline = 'top';
    ctx!.font = '14px Arial';
    ctx!.fillText('Browser fingerprint', 2, 2);
    const fingerprint = canvas.toDataURL();
    
    return btoa(fingerprint.slice(-50) + navigator.userAgent.slice(-50)).slice(0, 20);
  };

  // Load rate limiting data
  const loadRateLimitData = () => {
    const userIdentifier = getUserIdentifier();
    const rateLimitData = localStorage.getItem(`rateLimit_${userIdentifier}`);
    
    if (rateLimitData) {
      const data = JSON.parse(rateLimitData);
      const now = Date.now();
      
      if (data.blockUntil && now < data.blockUntil) {
        setIsBlocked(true);
        setBlockTimeRemaining(data.blockUntil - now);
        setAttemptCount(data.attempts || 0);
        return true;
      } else if (data.blockUntil && now >= data.blockUntil) {
        // Block period expired, reset attempts
        localStorage.removeItem(`rateLimit_${userIdentifier}`);
        setAttemptCount(0);
      } else {
        setAttemptCount(data.attempts || 0);
      }
    }
    return false;
  };

  // Save rate limiting data
  const saveRateLimitData = (attempts: number, blockUntil?: number) => {
    const userIdentifier = getUserIdentifier();
    const data = {
      attempts,
      blockUntil: blockUntil || null,
      lastAttempt: Date.now()
    };
    localStorage.setItem(`rateLimit_${userIdentifier}`, JSON.stringify(data));
  };

  // Handle failed login attempt
  const handleFailedAttempt = () => {
    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);
    
    if (newAttemptCount >= MAX_ATTEMPTS) {
      // Calculate block time (increases exponentially)
      const blockMultiplier = Math.pow(2, Math.floor(newAttemptCount / MAX_ATTEMPTS) - 1);
      const blockTime = BASE_BLOCK_TIME * blockMultiplier;
      const blockUntil = Date.now() + blockTime;
      
      setIsBlocked(true);
      setBlockTimeRemaining(blockTime);
      saveRateLimitData(newAttemptCount, blockUntil);
      
      setError(`Too many failed attempts. Account blocked for ${Math.ceil(blockTime / 60000)} minutes.`);
    } else {
      saveRateLimitData(newAttemptCount);
      setError(`Invalid username or password. ${MAX_ATTEMPTS - newAttemptCount} attempts remaining.`);
    }
  };

  // Block countdown timer
  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      const timer = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1000) {
            setIsBlocked(false);
            setAttemptCount(0);
            const userIdentifier = getUserIdentifier();
            localStorage.removeItem(`rateLimit_${userIdentifier}`);
            setError('');
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeRemaining]);

  // Auto-logout timer
  const LOGOUT_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Load saved data on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('adminCredentials');
    const savedAvailability = localStorage.getItem('siteAvailability');

    // Load rate limiting data
    loadRateLimitData();

    if (savedCredentials) {
      setCredentials(JSON.parse(savedCredentials));
    }
    if (savedAvailability) {
      try {
        const parsedAvailability = JSON.parse(savedAvailability);
        setAvailability(parsedAvailability);
        console.log('Admin loaded availability data:', parsedAvailability);
      } catch (error) {
        console.error('Error parsing availability data in admin:', error);
        // Reset to default if corrupted
        const defaultAvailability = {
          unavailableDates: [],
          message: 'We are currently booking events! Contact us to check availability for your date.'
        };
        setAvailability(defaultAvailability);
        localStorage.setItem('siteAvailability', JSON.stringify(defaultAvailability));
      }
    }
    setIsLoggedIn(false);
    sessionStorage.removeItem('isAdminAuthenticated');
  }, []);

  // Auto-logout functionality
  useEffect(() => {
    if (!isLoggedIn) return;

    const checkActivity = () => {
      const now = Date.now();
      if (now - lastActivity > LOGOUT_TIME) {
        handleLogout();
        alert('Session expired due to inactivity. Please log in again.');
      }
    };

    // Check every minute
    const interval = setInterval(checkActivity, 60000);

    // Activity listeners
    const updateActivity = () => setLastActivity(Date.now());
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      clearInterval(interval);
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [isLoggedIn, lastActivity]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check if user is blocked
    if (isBlocked) {
      const minutes = Math.ceil(blockTimeRemaining / 60000);
      setError(`Account is blocked. Try again in ${minutes} minute(s).`);
      return;
    }

    if (loginData.username === credentials.username && loginData.password === credentials.password) {
      setIsLoggedIn(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setLastActivity(Date.now());
      setLoginData({ username: '', password: '' });
      // Reset rate limiting on successful login
      setAttemptCount(0);
      const userIdentifier = getUserIdentifier();
      localStorage.removeItem(`rateLimit_${userIdentifier}`);
    } else {
      handleFailedAttempt();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isAdminAuthenticated');
    setLastActivity(0);
    setLoginData({ username: '', password: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let sanitizedValue = value;
    
    // Sanitize input to remove script/image tags
    if (type !== 'checkbox') {
      sanitizedValue = sanitizeInput(value);
      
      // Apply special character validation based on field type
      if (name === 'email') {
        sanitizedValue = validateSpecialChars(sanitizedValue, true);
      } else {
        sanitizedValue = validateSpecialChars(sanitizedValue, false);
      }
    }
    
    setLoginData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleResetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let sanitizedValue = sanitizeInput(value);
    
    // Apply special character validation based on field type
    if (name === 'email') {
      sanitizedValue = validateSpecialChars(sanitizedValue, true);
    } else {
      sanitizedValue = validateSpecialChars(sanitizedValue, false);
    }
    
    setResetData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleCredentialsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let sanitizedValue = sanitizeInput(value);
    sanitizedValue = validateSpecialChars(sanitizedValue, false);
    
    setNewCredentials(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleAvailabilityInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    
    let sanitizedValue = sanitizeInput(value);
    sanitizedValue = validateSpecialChars(sanitizedValue, false);
    
    setAvailability(prev => ({
      ...prev,
      message: sanitizedValue
    }));
  };

  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newCredentials.password !== newCredentials.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newCredentials.username.length < 3 || newCredentials.password.length < 6) {
      setError('Username must be at least 3 characters and password at least 6 characters');
      return;
    }

    const updatedCredentials = {
      username: newCredentials.username,
      password: newCredentials.password
    };

    setCredentials(updatedCredentials);
    localStorage.setItem('adminCredentials', JSON.stringify(updatedCredentials));
    setNewCredentials({ username: '', password: '', confirmPassword: '' });
    setShowChangeCredentials(false);
    setSuccess('Credentials updated successfully!');
  };

  const addSelectedDates = () => {
    if (selectedDates.length === 0) return;
    
    setShowConfirmation(true);
  };

  const confirmAddDates = () => {
    const newDates = selectedDates.filter(date => !availability.unavailableDates.includes(date));
    if (newDates.length === 0) {
      setError('All selected dates are already marked as unavailable');
      setShowConfirmation(false);
      return;
    }

    const updatedAvailability = {
      ...availability,
      unavailableDates: [...availability.unavailableDates, ...newDates].sort()
    };
    setAvailability(updatedAvailability);
    localStorage.setItem('siteAvailability', JSON.stringify(updatedAvailability));
    console.log('Admin added unavailable dates:', newDates);
    console.log('Total unavailable dates:', updatedAvailability.unavailableDates);
    setSelectedDates([]);
    setShowConfirmation(false);
    setSuccess(`${newDates.length} date(s) added to unavailable list`);
  };

  const toggleDateSelection = (date: string) => {
    setSelectedDates(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const generateCalendarDates = () => {
    const today = new Date();
    const dates = [];
    
    // Generate next 2 years (731 days to match book now page)
    for (let i = 0; i < 731; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };
  const removeUnavailableDate = (dateToRemove: string) => {
    setDateToRemove(dateToRemove);
    setShowRemoveConfirmation(true);
  };

  const confirmRemoveDate = () => {
    if (dateToRemove) {
      const updatedAvailability = {
        ...availability,
        unavailableDates: availability.unavailableDates.filter(date => date !== dateToRemove)
      };
      setAvailability(updatedAvailability);
      localStorage.setItem('siteAvailability', JSON.stringify(updatedAvailability));
      console.log('Admin removed unavailable date:', dateToRemove);
      console.log('Remaining unavailable dates:', updatedAvailability.unavailableDates);
      setSuccess('Date removed from unavailable list');
      setShowRemoveConfirmation(false);
      setDateToRemove(null);
    }
  };

  const cancelRemoveDate = () => {
    setShowRemoveConfirmation(false);
    setDateToRemove(null);
  };

  const updateMessage = () => {
    localStorage.setItem('siteAvailability', JSON.stringify(availability));
    console.log('Admin updated availability message:', availability.message);
    setSuccess('Availability message updated!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Generate random 6-character code
  const generateVerificationCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Send verification email
  const sendVerificationEmail = async (email: string, code: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/send-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };

  // Handle password reset request
  const handlePasswordResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    // Validate email domain
    if (!resetData.email.endsWith('@projectpartyproductions.com')) {
      setResetError('Email must end with @projectpartyproductions.com');
      return;
    }

    // Generate and send verification code
    const code = generateVerificationCode();
    const emailSent = await sendVerificationEmail(resetData.email, code);

    if (emailSent) {
      setGeneratedCode(code);
      setCodeExpiry(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
      setResetStep('verify');
      setResetSuccess('Verification code sent to your email. Code expires in 10 minutes.');
    } else {
      // Fallback: show code in console for development
      console.log('Verification code (for development):', code);
      setGeneratedCode(code);
      setCodeExpiry(Date.now() + 10 * 60 * 1000);
      setResetStep('verify');
      setResetSuccess('Email service unavailable. Check console for verification code (development mode).');
    }
  };

  // Handle code verification
  const handleCodeVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');

    // Check if code expired
    if (Date.now() > codeExpiry) {
      setResetError('Verification code has expired. Please request a new one.');
      setResetStep('email');
      return;
    }

    // Verify code
    if (resetData.verificationCode.toUpperCase() !== generatedCode) {
      setResetError('Invalid verification code. Please try again.');
      return;
    }

    setResetStep('password');
    setResetSuccess('Code verified! Please enter your new password.');
  };

  // Handle password reset completion
  const handlePasswordResetComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');

    // Validate passwords
    if (resetData.newPassword !== resetData.confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    if (resetData.newPassword.length < 6) {
      setResetError('Password must be at least 6 characters');
      return;
    }

    // Update credentials
    const updatedCredentials = {
      ...credentials,
      password: resetData.newPassword
    };

    setCredentials(updatedCredentials);
    localStorage.setItem('adminCredentials', JSON.stringify(updatedCredentials));
    
    // Reset form and show success
    setResetData({ email: '', verificationCode: '', newPassword: '', confirmPassword: '' });
    setShowPasswordReset(false);
    setResetStep('email');
    setGeneratedCode('');
    setCodeExpiry(0);
    setSuccess('Password reset successfully! Please log in with your new password.');
  };

  // Cancel password reset
  const cancelPasswordReset = () => {
    setShowPasswordReset(false);
    setResetStep('email');
    setResetData({ email: '', verificationCode: '', newPassword: '', confirmPassword: '' });
    setResetError('');
    setResetSuccess('');
    setGeneratedCode('');
    setCodeExpiry(0);
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access availability management</p>
            </div>

            {!showPasswordReset ? (
              <>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={loginData.username}
                      onChange={handleInputChange}
                      name="username"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                      required
                      disabled={isBlocked}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginData.password}
                        onChange={handleInputChange}
                        name="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent pr-12"
                        required
                        disabled={isBlocked}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                      {isBlocked && blockTimeRemaining > 0 && (
                        <div className="mt-2 text-sm">
                          Time remaining: {Math.floor(blockTimeRemaining / 60000)}:{String(Math.floor((blockTimeRemaining % 60000) / 1000)).padStart(2, '0')}
                        </div>
                      )}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                      {success}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#B5A99A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
                    disabled={isBlocked}
                  >
                    {isBlocked ? `Blocked (${Math.ceil(blockTimeRemaining / 60000)}m)` : 'Login'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowPasswordReset(true)}
                    className="text-[#B5A99A] hover:text-[#F7E7CE] text-sm font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Reset Password</h2>
                  <p className="text-sm text-gray-600">
                    {resetStep === 'email' && 'Enter your Project Party Productions email'}
                    {resetStep === 'verify' && 'Enter the verification code sent to your email'}
                    {resetStep === 'password' && 'Create your new password'}
                  </p>
                </div>

                {resetStep === 'email' && (
                  <form onSubmit={handlePasswordResetRequest} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={resetData.email}
                        onChange={handleResetInputChange}
                        name="email"
                        placeholder="your-email@projectpartyproductions.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#B5A99A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
                    >
                      Send Verification Code
                    </button>
                  </form>
                )}

                {resetStep === 'verify' && (
                  <form onSubmit={handleCodeVerification} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        value={resetData.verificationCode}
                        onChange={(e) => {
                          const sanitized = sanitizeInput(e.target.value.toUpperCase());
                          const validated = validateSpecialChars(sanitized, false);
                          setResetData(prev => ({ ...prev, verificationCode: validated }));
                        }}
                        placeholder="Enter 6-character code"
                        maxLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent text-center text-lg font-mono"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Code expires in {Math.max(0, Math.ceil((codeExpiry - Date.now()) / 60000))} minutes
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#B5A99A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
                    >
                      Verify Code
                    </button>
                  </form>
                )}

                {resetStep === 'password' && (
                  <form onSubmit={handlePasswordResetComplete} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={resetData.newPassword}
                        onChange={handleResetInputChange}
                        name="newPassword"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                        required
                        minLength={6}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={resetData.confirmPassword}
                        onChange={handleResetInputChange}
                        name="confirmPassword"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#B5A99A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
                    >
                      Reset Password
                    </button>
                  </form>
                )}

                {resetError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {resetError}
                  </div>
                )}

                {resetSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {resetSuccess}
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={cancelPasswordReset}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F7E7CE] to-[#B5A99A] p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-700">Manage site availability and settings</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Availability Message */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability Message</h2>
              <div className="space-y-4">
                <textarea
                  value={availability.message}
                  onChange={handleAvailabilityInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  placeholder="Enter the message that will appear on the Book Now page"
                />
                <button
                  onClick={updateMessage}
                  className="flex items-center space-x-2 bg-[#B5A99A] text-white px-6 py-2 rounded-lg hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
                >
                  <Save size={20} />
                  <span>Update Message</span>
                </button>
              </div>
            </section>

            {/* Unavailable Dates */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Unavailable Dates</h2>
              
              {/* Multiple Date Selection */}
              <div className="mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-800">
                      Select Dates to Mark Unavailable ({selectedDates.length} selected)
                    </h4>
                    <div className="space-x-2">
                      <button
                        onClick={() => setSelectedDates([])}
                        className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={addSelectedDates}
                        disabled={selectedDates.length === 0}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Mark {selectedDates.length} Date(s) Unavailable
                      </button>
                    </div>
                  </div>
                  
                  {/* Selected Dates Preview */}
                  {selectedDates.length > 0 && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-800 mb-2">
                        Selected Dates ({selectedDates.length}):
                      </h5>
                      <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                        {selectedDates.map((date) => (
                          <span
                            key={date}
                            className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs"
                          >
                            {new Date(date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto">
                    {generateCalendarDates().map((date) => {
                      const dateObj = new Date(date);
                      const isSelected = selectedDates.includes(date);
                      const isAlreadyUnavailable = availability.unavailableDates.includes(date);
                      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNumber = dateObj.getDate();
                      const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
                      
                      return (
                        <button
                          key={date}
                          onClick={() => !isAlreadyUnavailable && toggleDateSelection(date)}
                          disabled={isAlreadyUnavailable}
                          className={`p-2 text-xs rounded border transition-colors ${
                            isAlreadyUnavailable
                              ? 'bg-red-100 text-red-400 border-red-200 cursor-not-allowed'
                              : isSelected
                              ? 'bg-red-500 text-white border-red-500'
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-medium">{dayNumber}</div>
                          <div className="text-xs opacity-75">{dayName}</div>
                          <div className="text-xs opacity-75">{monthName}</div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    <span className="inline-block w-3 h-3 bg-red-100 border border-red-200 rounded mr-1"></span>
                    Already unavailable
                    <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1 ml-4"></span>
                    Selected
                    <span className="inline-block w-3 h-3 bg-white border border-gray-200 rounded mr-1 ml-4"></span>
                    Available
                  </div>
                </div>
              </div>

              {/* Current Unavailable Dates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Currently Unavailable Dates ({availability.unavailableDates.length})
                </h3>
                {availability.unavailableDates.length === 0 ? (
                  <p className="text-gray-500 italic">No unavailable dates set</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availability.unavailableDates.map((date) => (
                      <div
                        key={date}
                        className="flex justify-between items-center bg-red-50 border border-red-200 px-4 py-3 rounded-lg"
                      >
                        <span className="text-red-800 font-medium">
                          {formatDate(date)}
                        </span>
                        <button
                          onClick={() => removeUnavailableDate(date)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Confirmation Modal */}
            {showConfirmation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Confirm Unavailable Dates
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to mark the following {selectedDates.length} date(s) as unavailable?
                    </p>
                    
                    {/* Scrollable date list */}
                    <div className="max-h-48 overflow-y-auto mb-6 p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        {selectedDates.map((date) => (
                          <div
                            key={date}
                            className="flex justify-between items-center bg-white px-3 py-2 rounded border"
                          >
                            <span className="font-medium text-gray-800">
                              {formatDate(date)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowConfirmation(false)}
                        className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmAddDates}
                        className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        Yes, Mark Unavailable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Remove Date Confirmation Modal */}
            {showRemoveConfirmation && dateToRemove && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Confirm Remove Date
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to remove this date from the unavailable list? This will make it available for booking again.
                    </p>
                    
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-medium text-green-800">
                        {formatDate(dateToRemove)}
                      </div>
                      <div className="text-sm text-green-600 mt-1">
                        This date will become available for booking
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={cancelRemoveDate}
                        className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmRemoveDate}
                        className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                      >
                        Yes, Remove Date
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
