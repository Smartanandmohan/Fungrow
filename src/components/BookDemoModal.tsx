import { useState } from "react";
import Modal from "./Modal";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    phoneNumber: "",
    teamSize: "",
    projectDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Demo request submitted! We'll contact you within 24 hours."
    );
    onClose();
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-sm";

  const labelClasses = "text-sm font-medium text-slate-700 mb-1.5";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book a Demo">
      <p className="mb-6 text-sm text-slate-500">
        Schedule a personalized demo with our team to see how Funngro can help
        your business.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className={labelClasses}>
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Company Name */}
        <div className="flex flex-col">
          <label htmlFor="companyName" className={labelClasses}>
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            required
            placeholder="Your company name"
            value={formData.companyName}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Work Email */}
        <div className="flex flex-col">
          <label htmlFor="workEmail" className={labelClasses}>
            Work Email
          </label>
          <input
            type="email"
            id="workEmail"
            name="workEmail"
            required
            placeholder="you@company.com"
            value={formData.workEmail}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className={labelClasses}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+91 98765 43210"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Team Size */}
        <div className="flex flex-col">
          <label htmlFor="teamSize" className={labelClasses}>
            Team Size
          </label>
          <select
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select team size</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="200+">200+</option>
          </select>
        </div>

        {/* Project Details */}
        <div className="flex flex-col">
          <label htmlFor="projectDetails" className={labelClasses}>
            Tell us about your project
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            rows={3}
            placeholder="What kind of work do you need help with?"
            value={formData.projectDetails}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Schedule Demo
        </button>

        {/* Trust Note */}
        <p className="text-center text-xs text-slate-400">
          🔒 Your information is secure and will never be shared.
        </p>
      </form>
    </Modal>
  );
}

export default BookDemoModal;
