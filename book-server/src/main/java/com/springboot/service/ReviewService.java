package com.springboot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.dto.ReviewDTO;
import com.springboot.entity.Book;
import com.springboot.entity.Review;
import com.springboot.entity.User;
import com.springboot.repository.BookRepository;
import com.springboot.repository.ReviewRepository;
import com.springboot.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReviewService {
	
	private final ReviewRepository reviewRepo;
    private final BookRepository bookRepo;
    private final UserRepository userRepo;

	//리뷰 등록
    public Long save(ReviewDTO dto, String username) {
        Book book = bookRepo.findById(dto.getBookId())
                .orElseThrow(() -> new RuntimeException("도서를 찾을 수 없습니다."));

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Review review = new Review();
        review.setContent(dto.getContent());
        review.setBook(book);
        review.setUser(user);

        return reviewRepo.save(review).getId();
    }

    // 리뷰 목록
    public List<ReviewDTO> findAll(Long bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("도서를 찾을 수 없습니다."));

        List<Review> list = reviewRepo.findAllByBookOrderByIdDesc(book);

        return list.stream().map(r -> {
	            ReviewDTO dto = new ReviewDTO();
	            dto.setId(r.getId());
	            dto.setContent(r.getContent());
	            dto.setRegDate(r.getRegDate());
	            dto.setUpdateDate(r.getUpdateDate());
	            dto.setBookId(bookId);
	            dto.setWriter(r.getUser().getFullname()); // 작성자 이름
	            dto.setUserId(r.getUser().getId());
	            return dto;
	        }).toList();
    }
}
