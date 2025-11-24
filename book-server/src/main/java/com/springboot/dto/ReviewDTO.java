package com.springboot.dto;

import java.sql.Timestamp;
import com.springboot.entity.Review;

import lombok.Data;

@Data
public class ReviewDTO{
	
	private Long id;
	private String writer;
	private Long userId;
	private String content;
	private Long bookId;
	private Timestamp regDate;
	private Timestamp updateDate;
	
	//Entity -> DTO 변환
	/*public static ReviewDTO toDTO(Review review) {
		ReviewDTO dto = new ReviewDTO();
		dto.setId(review.getId());
		//dto.setWriter(review.getWriter());
		dto.setContent(review.getContent());
		dto.setRegDate(review.getRegDate());
		dto.setUpdateDate(review.getUpdateDate());
		dto.setBookId(review.getBook().getId());
		return dto;
	}*/
}
