package com.springboot.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	//제목 검색
	Page<Book> findByTitleContaining(String title, Pageable pageable);
	
	//저자 검색
	Page<Book> findByAuthorContaining(String author, Pageable pageable);
	
	//제목 및 저자 검색
	Page<Book> findByTitleContainingOrAuthorContaining(String title, 
			String author, Pageable pageable);

}
