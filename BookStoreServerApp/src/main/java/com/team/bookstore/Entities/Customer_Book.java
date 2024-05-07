package com.team.bookstore.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.team.bookstore.Entities.ComposeKey.CustomerBookKey;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "user_book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Customer_Book {
    @EmbeddedId
    CustomerBookKey id = new CustomerBookKey();
    @JsonBackReference("customer")
    @ManyToOne
    @MapsId("customer_id")
    @JoinColumn(name = "customer_id")
    CustomerInformation customer_information;
    @JsonBackReference("book")
    @ManyToOne
    @MapsId("book_id")
    @JoinColumn(name = "book_id")
    Book book;


}
