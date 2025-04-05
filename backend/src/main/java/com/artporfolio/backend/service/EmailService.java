package com.artporfolio.backend.service;

import com.artporfolio.backend.model.Order;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmation(Order order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(order.getCustomerEmail());
            helper.setSubject("Thank You for Your Order!");

            String html = """
                <h2>Thank you, %s!</h2>
                <p>We’ve received your order and will process it shortly.</p>
                <h3>Order Summary:</h3>
                <ul>
                    <li><strong>Total:</strong> $%s</li>
                    <li><strong>Shipping Address:</strong> %s</li>
                    <li><strong>Status:</strong> %s</li>
                </ul>
                <p>We’ll notify you as your order ships.</p>
                """.formatted(
                    order.getCustomerName(),
                    String.format("%.2f", order.getTotalPrice()),
                    order.getShippingAddress(),
                    order.getStatus() == null ? "Pending" : order.getStatus()
            );

            helper.setText(html, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
