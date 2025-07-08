// client/src/utils/formatDate.js

/**
 * Format a date string or Date object into various formats
 * @param {string|Date} date - The date to format (ISO string or Date object)
 * @param {object} options - Formatting options
 * @param {string} options.format - Output format ('relative', 'short', 'long', 'iso', 'time-ago')
 * @param {boolean} options.includeTime - Whether to include time in the output (for 'short' and 'long' formats)
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
    const {
      format = 'short',
      includeTime = false
    } = options;
  
    if (!date) return '';
  
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date provided to formatDate');
      return '';
    }
  
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
  
    // For relative/time-ago formats
    if (format === 'relative' || format === 'time-ago') {
      return getRelativeTime(diffInSeconds, format === 'time-ago');
    }
  
    // For specific format requests
    switch (format) {
      case 'iso':
        return dateObj.toISOString();
      case 'short':
        return formatShortDate(dateObj, includeTime);
      case 'long':
        return formatLongDate(dateObj, includeTime);
      default:
        return formatShortDate(dateObj, includeTime);
    }
  }
  
  function getRelativeTime(diffInSeconds, includeSuffix = true) {
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
  
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return includeSuffix 
          ? `${interval} ${unit}${interval === 1 ? '' : 's'} ago`
          : `${interval} ${unit}${interval === 1 ? '' : 's'}`;
      }
    }
  
    return includeSuffix ? 'just now' : 'less than a minute';
  }
  
  function formatShortDate(dateObj, includeTime) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
  
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
  
    return dateObj.toLocaleDateString(undefined, options);
  }
  
  function formatLongDate(dateObj, includeTime) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.second = '2-digit';
    }
  
    return dateObj.toLocaleDateString(undefined, options);
  }
  
  // Additional utility functions
  export function isToday(date) {
    if (!date) return false;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  }
  
  export function isYesterday(date) {
    if (!date) return false;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      dateObj.getDate() === yesterday.getDate() &&
      dateObj.getMonth() === yesterday.getMonth() &&
      dateObj.getFullYear() === yesterday.getFullYear()
    );
  }