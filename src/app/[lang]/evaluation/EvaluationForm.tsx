'use client';

import { useState, useRef } from 'react';

interface EvaluationFormProps {
  lang: 'en' | 'zh';
  dict: {
    firstName: string;
    lastName: string;
    title: string;
    titleOptions: { value: string; label: string }[];
    email: string;
    phone: string;
    wechat: string;
    projectType: string;
    projectTypeOptions: { value: string; label: string }[];
    startDate: string;
    contactMethod: string;
    contactOptions: { value: string; label: string }[];
    address: string;
    description: string;
    files: string;
    filesHint: string;
    browseFile: string;
    submit: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
  };
}

export default function EvaluationForm({ lang, dict }: EvaluationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [dateSelected, setDateSelected] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
        return;
      } catch {
        // showPicker may throw if input isn't focused yet; fall through to focus
      }
    }
    input.focus();
  };

  const handleContactToggle = (value: string) => {
    setSelectedContacts((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.delete('contactMethods');
    selectedContacts.forEach((c) => formData.append('contactMethods', c));

    try {
      const res = await fetch('/api/evaluation', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setSelectedContacts([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#192324] mb-2">
            {dict.firstName} <span className="text-red-500">*</span>
          </label>
          <input
            name="firstName"
            type="text"
            required
            className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#192324] mb-2">
            {dict.lastName} <span className="text-red-500">*</span>
          </label>
          <input
            name="lastName"
            type="text"
            required
            className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324]"
          />
        </div>
      </div>

      {/* Title & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#192324] mb-2">
            {dict.title}
          </label>
          <select
            name="personTitle"
            className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324]"
          >
            <option value="">{dict.titleOptions[0].label}</option>
            {dict.titleOptions.slice(1).map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#192324] mb-2">
            {dict.email} <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324]"
          />
        </div>
      </div>

      {/* Phone & Wechat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#192324] mb-2">
            {dict.phone} <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#192324] mb-2">
            {dict.wechat}
          </label>
          <input
            name="wechat"
            type="text"
            className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324]"
          />
        </div>
      </div>

      {/* Project Type & Start Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#192324] mb-2">
            {dict.projectType} <span className="text-red-500">*</span>
          </label>
          <select
            name="projectType"
            required
            className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324]"
          >
            <option value="">{dict.projectTypeOptions[0].label}</option>
            {dict.projectTypeOptions.slice(1).map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#192324] mb-2">
            {dict.startDate}
          </label>
          <div
            className="relative w-full cursor-pointer"
            onClick={openDatePicker}
          >
            <input
              ref={dateInputRef}
              name="startDate"
              type="date"
              lang="en"
              onChange={() => setDateSelected(true)}
              style={{ color: dateSelected ? '#192324' : '#f0efed' }}
              className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] cursor-pointer [color-scheme:light]"
            />
          </div>
        </div>
      </div>

      {/* Contact Method */}
      <div>
        <label className="block text-sm font-semibold text-[#192324] mb-3">
          {dict.contactMethod}
        </label>
        <div className="flex flex-wrap gap-4">
          {dict.contactOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedContacts.includes(opt.value)}
                onChange={() => handleContactToggle(opt.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#aa8b57] focus:ring-[#aa8b57]"
              />
              <span className="text-sm text-[#192324]">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-[#192324] mb-2">
          {dict.address} <span className="text-red-500">*</span>
        </label>
        <input
          name="address"
          type="text"
          required
          className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324]"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-[#192324] mb-2">
          {dict.description} <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          required
          rows={4}
          className="w-full px-4 py-3 bg-[#f0efed] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa8b57] text-[#192324] resize-none"
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-semibold text-[#192324] mb-2">
          {dict.files}
        </label>
        <p className="text-xs text-gray-400 mb-2">{dict.filesHint}</p>
        <label className="flex items-center gap-4 cursor-pointer">
          <span className="px-4 py-2 bg-[#aa8b57] text-white font-semibold rounded-lg hover:bg-[#192324] transition-colors duration-300">
            {dict.browseFile}
          </span>
          <span className="text-sm text-gray-500">
            {fileNames.length > 0 ? fileNames.join(', ') : ''}
          </span>
          <input
            name="files"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setFileNames(Array.from(files).map((f) => f.name));
              }
            }}
          />
        </label>
      </div>

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-3 bg-[#aa8b57] text-white font-semibold rounded-lg hover:bg-[#192324] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? dict.submitting : dict.submit}
        </button>
      </div>

      {status === 'success' && (
        <p className="text-center text-green-600 font-medium">{dict.successMessage}</p>
      )}
      {status === 'error' && (
        <p className="text-center text-red-600 font-medium">{dict.errorMessage}</p>
      )}
    </form>
  );
}
