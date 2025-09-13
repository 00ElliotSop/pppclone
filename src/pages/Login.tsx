import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Calendar, Save, LogOut } from 'lucide-react';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: 'projectparty2024'
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
  const [newDate, setNewDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showChangeCredentials, setShowChangeCredentials] = useState(false);
  const navigate = useNavigate();

  // Load saved data on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('adminCredentials');
    const savedAvailability = localStorage.getItem('siteAvailability');
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');

    if (savedCredentials) {
      setCredentials(JSON.parse(savedCredentials));
    }
    if (savedAvailability) {
      setAvailability(JSON.parse(savedAvailability));
    }
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (loginData.username === credentials.username && loginData.password === credentials.password) {
      setIsLoggedIn(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setLoginData({ username: '', password: '' });
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isAdminAuthenticated');
    setLoginData({ username: '', password: '' });
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

  const addUnavailableDate = () => {
    if (newDate && !availability.unavailableDates.includes(newDate)) {
      const updatedAvailability = {
        ...availability,
        unavailableDates: [...availability.unavailableDates, newDate].sort()
      };
      setAvailability(updatedAvailability);
      localStorage.setItem('siteAvailability', JSON.stringify(updatedAvailability));
      setNewDate('');
      setSuccess('Date added to unavailable list');
    }
  };

  const removeUnavailableDate = (dateToRemove: string) => {
    const updatedAvailability = {
      ...availability,
      unavailableDates: availability.unavailableDates.filter(date => date !== dateToRemove)
    };
    setAvailability(updatedAvailability);
    localStorage.setItem('siteAvailability', JSON.stringify(updatedAvailability));
    setSuccess('Date removed from unavailable list');
  };

  const updateMessage = () => {
    localStorage.setItem('siteAvailability', JSON.stringify(availability));
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

  if (!isLoggedIn) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access availability management</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  required
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
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent pr-12"
                    required
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
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#B5A99A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
              >
                Login
              </button>
            </form>
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
                  onChange={(e) => setAvailability(prev => ({ ...prev, message: e.target.value }))}
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
              
              {/* Add New Date */}
              <div className="flex space-x-4 mb-6">
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                />
                <button
                  onClick={addUnavailableDate}
                  disabled={!newDate}
                  className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Calendar size={20} />
                  <span>Mark Unavailable</span>
                </button>
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

            {/* Change Credentials */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Change Login Credentials</h2>
                <button
                  onClick={() => setShowChangeCredentials(!showChangeCredentials)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {showChangeCredentials ? 'Cancel' : 'Change Credentials'}
                </button>
              </div>

              {showChangeCredentials && (
                <form onSubmit={handleChangeCredentials} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Username
                      </label>
                      <input
                        type="text"
                        value={newCredentials.username}
                        onChange={(e) => setNewCredentials(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                        required
                        minLength={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newCredentials.password}
                        onChange={(e) => setNewCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={newCredentials.confirmPassword}
                      onChange={(e) => setNewCredentials(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="bg-[#B5A99A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
                  >
                    Update Credentials
                  </button>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;