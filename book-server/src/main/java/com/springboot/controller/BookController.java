package com.springboot.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.entity.Book;
import com.springboot.service.BookService;

import lombok.RequiredArgsConstructor;

//@CrossOrigin(origins = {"http://localhost:3000", "http://52.78.205.73:3000"})
@CrossOrigin(origins = "*")
@RequestMapping("/api/books")
@RequiredArgsConstructor
@RestController
public class BookController {

	private final BookService bookService;
	
	//도서 등록
	@PostMapping
	public Book saveBook(@RequestBody Book book) {
		bookService.save(book);
		return bookService.save(book);
	}
	
	//도서 목록
	@GetMapping
	public List<Book> getAllBooks(){
		List<Book> bookList = bookService.findAll();
		return bookList;
	}
	
	// 도서 목록 (페이징)
	/*@GetMapping("/pages")
	public Page<Book> getBookPages(
	        @PageableDefault(page = 1) Pageable pageable) {

	    return bookService.findAllPage(pageable);
	}*/
	
	// 도서 목록(페이징, 검색)
	@GetMapping("/pages")
	public Page<Book> getBookPages(
	        @PageableDefault(page = 0) Pageable pageable,
	        @RequestParam(required = false) String keyword,
	        @RequestParam(defaultValue = "all") String type
	) {
	    return bookService.findAllPage(pageable, keyword, type);
	}

	//도서 정보(상세보기)
	@GetMapping("/{id}")
	public Book getBook(@PathVariable Long id){
		Book book = bookService.findById(id);
		return book;
	}
	
	//도서 삭제
	@DeleteMapping("/{id}")
	public void deleteBook(@PathVariable Long id) {
		bookService.delete(id);
	}
	
	//도서 수정
	@PutMapping("/{id}")
	public Book updateBook(@PathVariable Long id,
			@RequestBody Book book) {
		return bookService.update(id, book);
	}
}







