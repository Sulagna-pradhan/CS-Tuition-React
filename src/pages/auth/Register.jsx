'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faEnvelope,
  faCheck,
  faLock,
  faSchool,
  faUniversity,
  faCalendarAlt,
  faPhone,
  faUserFriends,
  faIdCard,
  faCheckCircle,
  faArrowRight,
  faArrowLeft,
  faEye,
  faEyeSlash,
  faShieldAlt,
  faInfoCircle,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
  const [otpTimer, setOtpTimer] = useState(30)
  const [canResendOtp, setCanResendOtp] = useState(false)
  const otpInputRefs = useRef([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    otpValue: '',
    collegeName: '',
    universityName: '',
    currentSemester: '',
    contactNumber: '',
    parentName: '',
    parentPhone: '',
    username: '',
    password: '',
    bio: ''
  })
  const [errors, setErrors] = useState({})
  const [otpSent, setOtpSent] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById('registration-form')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  // OTP timer effect
  useEffect(() => {
    let interval = null
    if (currentStep === 2 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prevTimer => prevTimer - 1)
      }, 1000)
    } else if (otpTimer === 0) {
      setCanResendOtp(true)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentStep, otpTimer])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleOtpChange = (index, value) => {
    // Validate input is only numbers
    if (value !== '' && !/^\d+$/.test(value)) return

    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)
    
    // Update the combined OTP value in formData
    const combinedOtp = newOtpValues.join('')
    setFormData(prev => ({
      ...prev,
      otpValue: combinedOtp
    }))
    
    // Clear OTP error when user types
    if (errors.otpValue) {
      setErrors(prev => ({
        ...prev,
        otpValue: ''
      }))
    }
    
    // Auto-focus to next field
    if (value !== '' && index < 5) {
      otpInputRefs.current[index + 1].focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (otpValues[index] === '' && index > 0) {
        // If current field is empty and backspace is pressed, focus previous field
        otpInputRefs.current[index - 1].focus()
      }
    }
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
      }
    } else if (step === 2) {
      if (!formData.otpValue || formData.otpValue.length !== 6) {
        newErrors.otpValue = 'Please enter a valid 6-digit OTP'
      }
    } else if (step === 3) {
      if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required'
      if (!formData.universityName.trim()) newErrors.universityName = 'University name is required'
      if (!formData.currentSemester.trim()) newErrors.currentSemester = 'Current semester is required'
    } else if (step === 4) {
      if (!formData.contactNumber.trim()) {
        newErrors.contactNumber = 'Contact number is required'
      } else if (!/^\d{10}$/.test(formData.contactNumber)) {
        newErrors.contactNumber = 'Enter a valid 10-digit contact number'
      }
      if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required'
      if (!formData.parentPhone.trim()) {
        newErrors.parentPhone = 'Parent phone is required'
      } else if (!/^\d{10}$/.test(formData.parentPhone)) {
        newErrors.parentPhone = 'Enter a valid 10-digit phone number'
      }
    } else if (step === 5) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required'
      } else if (formData.username.length < 4) {
        newErrors.username = 'Username must be at least 4 characters'
      }
      
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && !otpSent) {
        // Simulate sending OTP
        setOtpSent(true)
        // We're not actually sending an OTP, just simulating for the UI flow
      }
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1)
        window.scrollTo(0, 0)
      } else {
        handleSubmit()
      }
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    setIsFormSubmitted(true)
  }

  const resendOtp = () => {
    // Only allow resend if timer is done
    if (!canResendOtp) return
    
    // Reset the OTP fields
    setOtpValues(['', '', '', '', '', ''])
    setFormData(prev => ({
      ...prev,
      otpValue: ''
    }))
    
    // Reset timer and disabled state
    setOtpTimer(30)
    setCanResendOtp(false)
    
    // Simulate sending new OTP
    console.log('Resending OTP to', formData.email)
    
    // Focus first OTP input
    if (otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus()
    }
  }

  const verifyOtp = () => {
    // Simulate OTP verification
    if (formData.otpValue.length === 6) {
      // For demo, we're accepting any 6-digit code
      goToNextStep()
    } else {
      setErrors({...errors, otpValue: 'Please enter a valid 6-digit OTP'})
    }
  }

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Form step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">General Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition-colors">
                  Login here
                </a>
              </p>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">Verify Your Email</h3>
            
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    We've sent a verification code to <strong>{formData.email}</strong>. 
                    Please check your inbox and enter the 6-digit code below.
                  </p>
                </div>
              </div>
              
              <div className="mt-3 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                  <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                  <span>Code expires in 10 minutes</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6-Digit OTP Code</label>
              <div className="flex justify-center gap-2 sm:gap-3">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => otpInputRefs.current[idx] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold border-2 ${
                      errors.otpValue ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                ))}
              </div>
              {errors.otpValue && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.otpValue}</p>
              )}
            </div>
            
            <div className="flex justify-center items-center mt-4">
              <button
                type="button"
                onClick={resendOtp}
                disabled={!canResendOtp}
                className={`flex items-center gap-2 text-sm font-medium ${
                  canResendOtp 
                    ? 'text-indigo-600 hover:text-indigo-800 cursor-pointer' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                {canResendOtp 
                  ? "Resend OTP" 
                  : `Resend OTP in ${formatTime(otpTimer)}`
                }
              </button>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">Academic Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faSchool} />
                  </div>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.collegeName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter your college name"
                  />
                </div>
                {errors.collegeName && <p className="mt-1 text-sm text-red-600">{errors.collegeName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faUniversity} />
                  </div>
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.universityName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter your university name"
                  />
                </div>
                {errors.universityName && <p className="mt-1 text-sm text-red-600">{errors.universityName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                  <select
                    name="currentSemester"
                    value={formData.currentSemester}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.currentSemester ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white`}
                  >
                    <option value="">Select your current semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                  </select>
                </div>
                {errors.currentSemester && <p className="mt-1 text-sm text-red-600">{errors.currentSemester}</p>}
              </div>
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter your 10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faUserFriends} />
                  </div>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.parentName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.parentPhone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter parent/guardian phone number"
                    maxLength={10}
                  />
                </div>
                {errors.parentPhone && <p className="mt-1 text-sm text-red-600">{errors.parentPhone}</p>}
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Your contact information is kept secure and will only be used for important notifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
        
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">Create Your Account</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faIdCard} />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Choose a username"
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                {!errors.username && (
                  <p className="mt-1 text-xs text-gray-500">Username must be at least 4 characters long</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Create a password"
                  />
                  <div 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </div>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                {!errors.password && (
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Tell us a bit about yourself..."
                ></textarea>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center">
                  <input
                    id="terms-agree"
                    name="terms-agree"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms-agree" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  if (isFormSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Registration Complete!</h2>
            <p className="text-gray-600">
              Thank you for registering with us, <span className="font-medium">{formData.name}</span>. Your account has been successfully created. You can now access all our features.
            </p>
            <div className="pt-4">
              <a
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login to Your Account
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main
      id="registration-form"
      className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Student Registration
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Join Our Community</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Create your account to access all academic resources and tools.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                {step > 1 && (
                  <div className={`flex-1 h-1 ${currentStep >= step ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                )}
                <div className="relative">
                  <div 
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      currentStep > step 
                        ? 'bg-indigo-600 text-white' 
                        : currentStep === step 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > step ? (
                      <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                    {step === 1 && 'General'}
                    {step === 2 && 'Verify'}
                    {step === 3 && 'Academic'}
                    {step === 4 && 'Personal'}
                    {step === 5 && 'Account'}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

       
        {/* Added extra spacing div */}
        <div className="mb-20"></div>

        {/* Form Container */}
        <motion.div 
          className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Form Navigation */}
          <div className="px-6 md:px-8 pb-8 pt-4 bg-gray-50 flex justify-between">
            <button
              type="button"
              onClick={goToPrevStep}
              className={`px-5 py-2 ${
                currentStep === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } rounded-lg font-medium transition-colors flex items-center space-x-2`}
              disabled={currentStep === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
              <span>Previous</span>
            </button>
            
            <button
              type="button"
              onClick={currentStep === 2 ? verifyOtp : goToNextStep}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>{currentStep === 5 ? 'Register' : currentStep === 2 ? 'Verify' : 'Next'}</span>
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}