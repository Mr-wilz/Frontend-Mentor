$(document).ready(function() {
    // Clear local storage on page load
    localStorage.removeItem('uploadedAvatar');

    const dropArea = $('#drop-box');
    const fileInput = $('#file-input');
    const liveAvatarPreview = $('#liveAvatarPreview');
    const uploadIcon = dropArea.find('img').first();
    const dropText = $('#drop-text');
    const uploadedTextDiv = $('.uploaded_text_div');
    const removeButton = $('.remove_image');
    const changeButton = $('.change_image');
    const fileError = $('#fileError');
  
    // Function to handle file upload
    function handleFile(file) {
      if (file.type.startsWith('image/')) {
        if (file.size <= 500 * 1024) {
          const reader = new FileReader();
          reader.onload = function(e) {
            liveAvatarPreview.attr('src', e.target.result).removeClass('hidden');
            uploadIcon.addClass('hidden');
            dropText.addClass('hidden');
            uploadedTextDiv.removeClass('hidden');
            fileError.hide();
          };
          reader.readAsDataURL(file);
        } else {
          fileError.show();
          liveAvatarPreview.addClass('hidden').attr('src', '');
          uploadIcon.removeClass('hidden');
          dropText.removeClass('hidden');
          uploadedTextDiv.addClass('hidden');
        }
      } else {
        fileError.show().find('p').text('Please upload a JPG or PNG image.');
        liveAvatarPreview.addClass('hidden').attr('src', '');
        uploadIcon.removeClass('hidden');
        dropText.removeClass('hidden');
        uploadedTextDiv.addClass('hidden');
      }
    }
  
    // Drag and drop functionality
    dropArea.on('dragover', function(e) {
      e.preventDefault();
      $(this).addClass('dragover');
    });
  
    dropArea.on('dragleave', function() {
      $(this).removeClass('dragover');
    });
  
    dropArea.on('drop', function(e) {
      e.preventDefault();
      $(this).removeClass('dragover');
      const files = e.originalEvent.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    });
  
    // Click to upload functionality
    fileInput.on('change', function() {
      if (this.files.length > 0) {
        handleFile(this.files[0]);
      }
    });
  
    // Remove image functionality
    removeButton.on('click', function() {
      liveAvatarPreview.addClass('hidden').attr('src', '');
      uploadIcon.removeClass('hidden');
      dropText.removeClass('hidden');
      uploadedTextDiv.addClass('hidden');
      fileInput.val(''); // Clear the file input
      fileError.hide();
    });
  
    // Change image functionality
    changeButton.on('click', function() {
      fileInput.trigger('click'); // Trigger the file input click event
    });



    $('form').on('submit', function (event) {
        event.preventDefault(); // Stop default form behavior
    
        // Get input values
        const fullName = $('#name_input').val().trim();
        const email = $('#email_input').val().trim();
        const githubUsername = $('#github_input').val().trim();
        const avatarSrc = $('#liveAvatarPreview').attr('src'); // uploaded avatar preview
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        console.log("Full Name:", fullName);
        console.log("GitHub Username:", githubUsername);
        

        if (!emailRegex.test(email)) {
          $('#emailError').removeClass('hidden');
          return;
        } else {
          $('#emailError').addClass('hidden');
        }
    
        // Check other fields
        if (!fullName || !githubUsername) {
          alert('Please fill in your full name and GitHub username.');
          return;
        }
    
        // Generate unique ticket ID
        const ticketID = Math.floor(100000 + Math.random() * 900000); // 6-digit
    
      //generate ticket date
      $('#ticketDate').text(`${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} / Austin, TX`);

      
        // Set user data in ticket display section
        $('#ticketName').text(fullName);
        $('#ticketGitHub').text('@' + githubUsername);
        $('#userFullName').text(fullName);
        $('#userEmail').text(email);
        $('#ticketID').text(ticketID);
        
        // Set avatar — use uploaded or fallback to default
        const finalAvatar = avatarSrc || '../images/image-avatar.jpg';
        $('#avatarPreview').attr('src', finalAvatar);
    
        // Show ticket, hide form
        $('#ticketBody').removeClass('hidden');
        $('#confirmationSection').removeClass('hidden');
        $('.container').addClass('hidden'); // hide form
      });

    
  });