<template>
  <!-- Hero Section with Enhanced Parallax Effect -->
  <div
    class="relative min-h-[400px] flex items-center justify-center overflow-hidden pt-24"
  >
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-indigo-700/80 z-10"
      ></div>
      <img
        src="https://images.unsplash.com/photo-1582407947304-fd86f028f716"
        alt="Contact Us"
        class="w-full h-full object-cover scale-105"
        :style="{ transform: `translateY(${scrollY * 0.5}px)` }"
      />
    </div>
    <div class="relative z-20 text-center text-white px-4">
      <h1 class="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
        Get in Touch
      </h1>
      <p
        class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-light leading-relaxed"
      >
        Have questions about a property or need assistance? Our team is here to
        help you every step of the way.
      </p>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 py-24">
    <!-- Quick Contact Options -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
      <div
        v-for="(contact, index) in quickContacts"
        :key="index"
        class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100"
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300"
            :class="[contact.isHovered ? 'bg-blue-600' : 'bg-blue-50']"
            @mouseenter="contact.isHovered = true"
            @mouseleave="contact.isHovered = false"
          >
            <component
              :is="contact.icon"
              class="w-6 h-6 transition-colors duration-300"
              :class="[contact.isHovered ? 'text-white' : 'text-blue-600']"
            />
          </div>
          <div>
            <h3 class="font-semibold text-lg">{{ contact.title }}</h3>
            <p class="text-gray-600">{{ contact.value }}</p>
            <a
              v-if="contact.link"
              :href="contact.link"
              class="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center mt-2 group"
            >
              {{ contact.linkText }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-16">
      <!-- Contact Form -->
      <div class="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
        <h2 class="text-3xl font-bold mb-8 text-gray-900">Send Us a Message</h2>
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="form-label">First Name</label>
              <input
                v-model="form.firstName"
                type="text"
                class="form-input"
                :class="{ error: errors.firstName }"
                placeholder="John"
              />
              <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">
                {{ errors.firstName }}
              </p>
            </div>

            <div class="form-group">
              <label class="form-label">Last Name</label>
              <input
                v-model="form.lastName"
                type="text"
                class="form-input"
                :class="{ error: errors.lastName }"
                placeholder="Doe"
              />
              <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">
                {{ errors.lastName }}
              </p>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
              :class="{ error: errors.email }"
              placeholder="john@example.com"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div class="form-group">
            <label class="form-label">Subject</label>
            <select v-model="form.subject" class="form-select">
              <option value="">Select a subject</option>
              <option
                v-for="subject in subjects"
                :key="subject.value"
                :value="subject.value"
              >
                {{ subject.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea
              v-model="form.message"
              class="form-textarea"
              :class="{ error: errors.message }"
              rows="4"
              placeholder="Your message here..."
            ></textarea>
            <p v-if="errors.message" class="text-red-500 text-sm mt-1">
              {{ errors.message }}
            </p>
          </div>

          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              v-model="form.subscribe"
              id="subscribe"
              class="form-checkbox"
            />
            <label for="subscribe" class="text-sm text-gray-600">
              Keep me updated with latest properties and market insights
            </label>
          </div>

          <div class="flex items-center justify-between pt-4">
            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="flex items-center justify-center"
              >
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
              <span v-else>Send Message</span>
            </button>
            <button type="button" @click="resetForm" class="reset-button">
              Reset Form
            </button>
          </div>
        </form>
      </div>

      <!-- Office Information and FAQ -->
      <div class="space-y-8">
        <!-- Office Hours -->
        <div class="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h3 class="text-xl font-semibold mb-4">Office Hours</h3>
          <div class="space-y-2">
            <div class="flex justify-between text-gray-600">
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Saturday</span>
              <span>10:00 AM - 4:00 PM</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h3 class="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
          <div class="space-y-4">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
            >
              <button
                @click="faq.isOpen = !faq.isOpen"
                class="flex justify-between items-center w-full text-left"
              >
                <span class="font-medium text-gray-900">{{
                  faq.question
                }}</span>
                <svg
                  class="w-5 h-5 transform transition-transform"
                  :class="{ 'rotate-180': faq.isOpen }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <p v-if="faq.isOpen" class="mt-2 text-gray-600">
                  {{ faq.answer }}
                </p>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="mt-24">
      <h2 class="text-3xl font-bold mb-8 text-gray-900">Visit Our Office</h2>
      <div class="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <div class="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Office Location</h3>
            <p class="text-gray-600 mb-2">
              Ilica 242
              <br />
              10000 Zagreb, Croatia
            </p>
            <a
              href="https://goo.gl/maps/YOUR_GOOGLE_MAPS_LINK"
              target="_blank"
              class="text-blue-600 hover:text-blue-700 inline-flex items-center group"
            >
              Get Directions
              <svg
                class="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-medium">Phone</p>
                <p class="text-gray-600">+385 (1) 234-5678</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-medium">Email</p>
                <p class="text-gray-600">info@realestate.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Google Maps iframe -->
        <div class="h-[400px] rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            style="border: 0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.7974754664147!2d15.950582776657614!3d45.81325587108373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d1dc48b6c241%3A0x9f0d6df22681e8c!2sIlica%20242%2C%2010000%2C%20Zagreb!5e0!3m2!1sen!2shr!4v1709321547685!5m2!1sen!2shr"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";

// Scroll handling for parallax
const scrollY = ref(0);
const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Quick contacts data
const quickContacts = ref([
  {
    title: "Call Us",
    value: "+385 (1) 234-5678",
    icon: {
      template:
        '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>',
    },
    link: "tel:+38512345678",
    linkText: "Call now",
    isHovered: false,
  },
  {
    title: "Email Us",
    value: "info@realestate.com",
    icon: {
      template:
        '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    },
    link: "mailto:info@realestate.com",
    linkText: "Send email",
    isHovered: false,
  },
  {
    title: "Visit Us",
    value: "Ilica 242, Zagreb",
    icon: {
      template:
        '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
    },
    link: "https://goo.gl/maps/YOUR_GOOGLE_MAPS_LINK",
    linkText: "Get directions",
    isHovered: false,
  },
]);

// Form data
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
  subscribe: false,
});

const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "property", label: "Property Information" },
  { value: "viewing", label: "Schedule Viewing" },
  { value: "support", label: "Support" },
];

// FAQ data
const faqs = ref([
  {
    question: "What are your office hours?",
    answer:
      "We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays.",
    isOpen: false,
  },
  {
    question: "How can I schedule a property viewing?",
    answer:
      "You can schedule a viewing by filling out our contact form, calling us directly, or using the scheduling feature on our property listings.",
    isOpen: false,
  },
  {
    question: "What documents do I need to rent a property?",
    answer:
      "Typically, you'll need proof of income, employment verification, photo ID, and references from previous landlords.",
    isOpen: false,
  },
]);

// Form handling
const validateForm = () => {
  let isValid = true;
  errors.firstName = "";
  errors.lastName = "";
  errors.email = "";
  errors.message = "";

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required";
    isValid = false;
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required";
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!form.message.trim()) {
    errors.message = "Message is required";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Thank you for your message! We will get back to you soon.");
    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("There was an error submitting your message. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] = key === "subscribe" ? false : "";
  });
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};
</script>

<style scoped>
/* Enhanced form styling */
.form-group {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.form-label {
  display: block;
  font-size: 0.925rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.875rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  font-size: 1rem;
  color: #1f2937;
  background-color: #fff;
}

.form-input:hover,
.form-select:hover,
.form-textarea:hover {
  border-color: #d1d5db;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.submit-button {
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  background-image: linear-gradient(to right, #2563eb, #4f46e5);
  color: white;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
}

.submit-button:hover {
  background-image: linear-gradient(to right, #1d4ed8, #4338ca);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Enhanced transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
