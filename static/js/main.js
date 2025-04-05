document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.flash-message');
    if (flashMessages.length > 0) {
      setTimeout(() => {
        flashMessages.forEach(message => {
          message.style.opacity = '0';
          setTimeout(() => {
            message.style.display = 'none';
          }, 300);
        });
      }, 5000);
    }
  
    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      // Initial resize
      textarea.style.height = 'auto';
      textarea.style.height = (textarea.scrollHeight) + 'px';
      
      // Resize on input
      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
    });
  
    // Confirm deletions
    const deleteForms = document.querySelectorAll('form[action^="/delete/"]');
    deleteForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!confirm('Are you sure you want to delete this note?')) {
          e.preventDefault();
        }
      });
    });
  
    // Add click-away listener for mobile navigation
    const navItems = document.querySelectorAll('.main-nav a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        // Add mobile nav collapse logic here if needed
      });
    });
  
    // Add note filter functionality
    const filterInputs = document.querySelectorAll('.filter-form select');
    filterInputs.forEach(input => {
      input.addEventListener('change', () => {
        input.closest('form').submit();
      });
    });
  
    // Add markdown preview toggle if needed
    const previewButtons = document.querySelectorAll('.preview-button');
    previewButtons.forEach(button => {
      button.addEventListener('click', function() {
        const contentId = this.dataset.contentId;
        const editor = document.getElementById(`editor-${contentId}`);
        const preview = document.getElementById(`preview-${contentId}`);
        
        if (editor.style.display === 'none') {
          editor.style.display = 'block';
          preview.style.display = 'none';
          this.textContent = 'Preview';
        } else {
          editor.style.display = 'none';
          preview.style.display = 'block';
          this.textContent = 'Edit';
          
          // Convert markdown to HTML here or use a library
          // preview.innerHTML = convertMarkdown(editor.value);
        }
      });
    });
  });
  
  // Helper function for date formatting if needed
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Functions for potential rich text editing features
  function toggleBold() {
    const selection = window.getSelection().toString();
    const textarea = document.activeElement;
    if (textarea.tagName.toLowerCase() === 'textarea') {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      
      if (start !== end) {
        textarea.value = text.substring(0, start) + '**' + selection + '**' + text.substring(end);
        textarea.setSelectionRange(start + 2, end + 2);
        textarea.focus();
      }
    }
  }
  
  // Add future keyboard shortcuts here
  document.addEventListener('keydown', function(e) {
    // Example: Ctrl+S to save
    if (e.ctrlKey && e.key === 's' && document.querySelector('form.note-form')) {
      e.preventDefault();
      document.querySelector('form.note-form').submit();
    }
  });