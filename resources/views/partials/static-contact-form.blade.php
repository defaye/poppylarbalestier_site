<!-- Contact Form for Static Sites -->
<!-- This replaces the dynamic contact form with a static alternative -->

<div class="container" id="static-contact-form">
    <h1>Contact</h1>
    <div class="row my-4">
        <div class="col-12">
            <div class="my-4">
                <div class="alert alert-info">
                    <h5>Get in Touch</h5>
                    <p>I'd love to hear from you! Please reach out through any of these channels:</p>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Social Media</h6>
                            <ul class="list-unstyled">
                                <li><a href="{{ config('social.instagram_url') }}" target="_blank">📸 Instagram</a></li>
                                <li><a href="{{ config('social.facebook_url') }}" target="_blank">👍 Facebook</a></li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6>Email</h6>
                            <p><a href="mailto:hello@poppylarbalestier.com">hello@poppylarbalestier.com</a></p>
                            
                            <h6>Alternative Contact Options</h6>
                            <ul class="list-unstyled">
                                <li><a href="https://formspree.io/f/YOUR_FORM_ID" target="_blank">📝 Contact Form</a></li>
                                <li><a href="tel:+1234567890">📞 Phone</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Alternative: Embed a third-party contact form -->
                <!-- You can use services like Formspree, Netlify Forms, or Google Forms -->
                <div class="card mt-4">
                    <div class="card-header">
                        <h5>Send a Message</h5>
                    </div>
                    <div class="card-body">
                        <!-- Replace with your Formspree form action URL -->
                        <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" name="name" id="name" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" name="email" id="email" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input type="tel" name="phone" id="phone" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea name="message" id="message" class="form-control" rows="4" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Send Message</button>
                        </form>
                        
                        <small class="text-muted mt-2 d-block">
                            <strong>Note:</strong> To activate this form, sign up for a free account at 
                            <a href="https://formspree.io" target="_blank">Formspree.io</a> and replace 
                            "YOUR_FORM_ID" with your actual form ID.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    #static-contact-form .form-group {
        margin-bottom: 1rem;
    }
    
    #static-contact-form .form-control {
        border-radius: 0.25rem;
        border: 1px solid #ddd;
        padding: 0.5rem;
    }
    
    #static-contact-form .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
    }
    
    #static-contact-form .btn-primary:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }
</style>
