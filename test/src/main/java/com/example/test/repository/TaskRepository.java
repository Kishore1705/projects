package com.example.test.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.test.model.Tasks;


public interface TaskRepository extends CrudRepository<Tasks, Integer>{
	@Query("Select l from Tasks l where enddate=:enddate")
	public List<Tasks> getTodaysTask(@Param("enddate") String enddate);
	
	@Query("Select l from Tasks l")
	public List<Tasks> getAllTask();
	
	@Query("Select taskid from Tasks where taskid=:taskid")
	public Integer findTask(@Param("taskid") Integer taskid);
	
	@Query("Select l from Tasks l where status=:status")
	public List<Tasks> filterByStatus(@Param("status") String status);
	
	@Modifying
	@Transactional
	@Query("update Tasks set status=:status where taskid=:taskid")
	public Integer updateStatus(@Param("taskid") Integer taskid, @Param("status") String status);	
}
