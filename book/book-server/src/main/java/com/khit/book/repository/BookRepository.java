package com.khit.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.book.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
