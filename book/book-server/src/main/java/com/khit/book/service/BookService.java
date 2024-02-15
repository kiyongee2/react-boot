package com.khit.book.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.khit.book.entity.Book;
import com.khit.book.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookService {

	private final BookRepository bookRepository;

	public String save(Book book) {
		bookRepository.save(book);
		return "도서 등록 완료!";
	}

	public List<Book> findAll() {
		return bookRepository.findAll();
	}

	public Book findById(Long id) {
		//찾는 id가 없을 경우 예외 처리
		return bookRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("찾는 데이터가 없습니다."));
	}

	public String deleteById(Long id) {
		bookRepository.deleteById(id);
		return "OK";  //리엑트 if(res == "OK") 삭제
	}

	public String update(Book book) {
		//수정된 데이터를 저장함
		bookRepository.save(book);
		return "도서 수정 완료!!";
	}
}
