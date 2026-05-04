'use client';

import React, { useState, useRef } from 'react';

interface Position {
  value: string;
  label: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  positionDefault: string;
  positions: Position[];
  message: string;
  resume: string;
  resumeHint: string;
  browseFile: string;
  submit: string;
  submitting: string;
  successMessage: string;
  errorMessage: string;
}

export default function JoinUsForm({ formData }: { formData: FormData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('PDF only');
        e.target.value = '';
        setFileName('');
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        alert('Max 25MB');
        e.target.value = '';
        setFileName('');
        return;
      }
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-xl font-semibold text-[#192324]">{formData.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          placeholder={formData.firstName}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors"
        />
        <input
          type="text"
          name="lastName"
          placeholder={formData.lastName}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors"
        />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="email"
          name="email"
          placeholder={formData.email}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors"
        />
        <input
          type="tel"
          name="phone"
          placeholder={formData.phone}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors"
        />
      </div>

      {/* Position Select */}
      <select
        name="position"
        defaultValue=""
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[right_12px_center] bg-no-repeat pr-10"
      >
        <option value="" disabled className="text-gray-400">
          {formData.positionDefault}
        </option>
        {formData.positions.map((pos) => (
          <option key={pos.value} value={pos.value}>
            {pos.label}
          </option>
        ))}
      </select>

      {/* Message */}
      <textarea
        name="message"
        placeholder={formData.message}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors resize-none"
      />

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-semibold text-[#192324] mb-2">
          {formData.resume}
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#aa8b57] transition-colors text-center"
        >
          <input
            ref={fileInputRef}
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          {fileName ? (
            <p className="text-[#192324] font-medium">{fileName}</p>
          ) : (
            <p className="text-gray-400">{formData.resumeHint}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-10 py-3.5 bg-[#aa8b57] text-white font-semibold rounded-lg hover:bg-[#8a7046] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? formData.submitting : formData.submit}
      </button>
    </form>
  );
}
