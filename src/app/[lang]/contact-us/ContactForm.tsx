'use client';

import React, { useState } from 'react';
import { useRecaptcha } from '@/lib/use-recaptcha';

interface FormLabels {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  submitting: string;
  successMessage: string;
  errorMessage: string;
}

export default function ContactForm({ formData }: { formData: FormLabels }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { executeRecaptcha } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const form = e.currentTarget;
    const dataToSend = new FormData(form);

    const token = await executeRecaptcha('contact_us_submit');
    if (token) dataToSend.append('recaptchaToken', token);

    try {
      const res = await fetch('/api/contact-us', {
        method: 'POST',
        body: dataToSend,
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(formData.errorMessage);
      }
    } catch {
      setErrorMsg(formData.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="contactName"
          placeholder={formData.name}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors"
        />
        <input
          type="email"
          name="contactEmail"
          placeholder={formData.email}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors"
        />
      </div>

      <input
        type="tel"
        name="contactPhone"
        placeholder={formData.phone}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors"
      />

      <textarea
        name="contactMessage"
        placeholder={formData.message}
        rows={4}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#192324] placeholder-gray-400 focus:outline-none focus:border-[#aa8b57] focus:ring-1 focus:ring-[#aa8b57] transition-colors resize-none"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-10 py-3.5 bg-[#aa8b57] text-white font-semibold rounded-lg hover:bg-[#8a7046] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? formData.submitting : formData.submit}
      </button>

      {errorMsg && (
        <p className="text-red-600 font-medium">{errorMsg}</p>
      )}
    </form>
  );
}
