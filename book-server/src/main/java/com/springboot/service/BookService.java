package com.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.springboot.entity.Book;
import com.springboot.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookService {
	
	private final BookRepository bookRepo;

	//도서 등록
	public Book save(Book book) {
		return bookRepo.save(book);
	}

	//도서 목록
	public List<Book> findAll() {
		return bookRepo.findAll();
	}
	
	//도서 목록 페이지
	public Page<Book> findAllPage(Pageable pageable) {
		int page = pageable.getPageNumber() - 1; // Page 번호 보정
	    int pageSize = 5; // 한 페이지당 10개 출력

	    pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "id"));

	    return bookRepo.findAll(pageable);
	}
	
	////도서 목록 검색 및 페이지
	public Page<Book> findAllPage(Pageable pageable, String keyword, String type) {
		int page = pageable.getPageNumber();
	    int pageSize = 5;

	    pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "id"));

	    // 검색어 없으면 전체 조회
	    if (keyword == null || keyword.trim().isEmpty()) {
	        return bookRepo.findAll(pageable);
	    }

	    keyword = keyword.trim();

	    switch (type) {
	        case "title":
	            return bookRepo.findByTitleContaining(keyword, pageable);

	        case "author":
	            return bookRepo.findByAuthorContaining(keyword, pageable);

	        default:  // all
	            return bookRepo.findByTitleContainingOrAuthorContaining(
	                    keyword, keyword, pageable);
	    }
	}

	//도서 정보
	public Book findById(Long id) {
		//Optional<Book> book = bookRepo.findById(id);
		//return book.get();
		return bookRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("도서를 찾을 수 없습니다."));
	}

	//도서 삭제
	public void delete(Long id) {
		bookRepo.deleteById(id);
	}

	//도서 수정
	public Book update(Long id, Book updatedBook) {
		Book book = findById(id);
		book.setTitle(updatedBook.getTitle());
		book.setAuthor(updatedBook.getAuthor());
		return bookRepo.save(book);
	}

	

}
