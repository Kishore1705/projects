package com.example.test.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.model.Response;
import com.example.test.model.Tasks;
import com.example.test.repository.TaskRepository;


@RestController
@RequestMapping("/task")
public class TaskController {
static Logger log = Logger.getLogger(TaskController.class.getName());
	
	@Autowired
	TaskRepository taskRepo;
	
	/*Get All Tasks*/
	@RequestMapping(method = RequestMethod.GET)
	public List<Tasks> getAllTasks() {
		try{
			return taskRepo.getAllTask();
		}catch (Exception e) {
			log.info(e.getMessage());
			return null;
		}
	}
	
	/*Filter task by status*/
	@RequestMapping(value="/status", method = RequestMethod.GET)
	public List<Tasks> filterStatus(@RequestParam String status) {
		try{
			return taskRepo.filterByStatus(status);
		}catch (Exception e) {
			log.info(e.getMessage());
			return null;
		}
	}
	
	/*Filter task by start time*/
	/*@RequestMapping(method = RequestMethod.GET)
	public List<Tasks> filterStartTime(@RequestParam String starttime) {
		try{
			return taskRepo.getTodaysTask(enddate);
		}catch (Exception e) {
			log.info(e.getMessage());
			return null;
		}
	}*/
	
	/*Filter task by end time*/
	/*@RequestMapping(method = RequestMethod.GET)
	public List<Tasks> filterEndTime(@RequestParam String endtime) {
		try{
			return taskRepo.getTodaysTask(enddate);
		}catch (Exception e) {
			log.info(e.getMessage());
			return null;
		}
	}*/
	
	/*Get Tasks by date*/
	@RequestMapping(value="/today", method = RequestMethod.GET)
	public List<Tasks> getTaskbyDate(@RequestParam String enddate) {
		try{
			return taskRepo.getTodaysTask(enddate);
		}catch (Exception e) {
			log.info(e.getMessage());
			return null;
		}
	}
	
	/*Create*/
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public Response createTask(@RequestBody Tasks create) {
		Tasks tasks = create;
		log.info(tasks.getStartdate());
		log.info(tasks.getEnddate());
		Response res = new Response();
		try{
			tasks.setStatus("New");
			taskRepo.save(tasks);
			res.setTasks(tasks);
			res.setStatus(200);
			res.setMessage("Task Created");
			return res;
		}catch (Exception e) {
			log.info(e.getMessage());
			res.setStatus(422);
			res.setMessage("Couldn't create task");
		}
		return null;		
	}
	
	/*Update*/
	@RequestMapping(method = RequestMethod.PUT)
	public Response updateTask(@RequestBody Tasks update) {
		Tasks tasks = update;
		log.info(update.getTaskid());
		Response res = new Response();
		try{
			Integer id = taskRepo.findTask(update.getTaskid());
			log.info(id);
			if(id != null){
				tasks.setName(update.getName());
				tasks.setObjective(update.getObjective());
				tasks.setStatus(update.getStatus());
				tasks.setStartdate(update.getStartdate());
				tasks.setStarttime(update.getStarttime());
				tasks.setEndtime(update.getEndtime());
				tasks.setEnddate(update.getEnddate());
				taskRepo.save(tasks);
				
				res.setTasks(tasks);
				res.setStatus(200);
				res.setMessage("Task Updated");
			}
			return res;
		}catch (Exception e) {
			log.info(e.getMessage());
			res.setStatus(422);
			res.setMessage("Couldn't update task");
		}
		return null;		
	}
	/*Delete*/
	
	/*Delete*/
	@RequestMapping(method = RequestMethod.DELETE)
	public boolean deleteTask(@RequestParam Integer id) {
		try{
			taskRepo.delete(id);
			return true;
		}catch (Exception e) {
			log.info(e.getMessage());
			return false;
		}
	}
	/*Update*/
	
	/*update status*/
	@RequestMapping(value="/status", method = RequestMethod.PUT)
	public boolean updateTaskStatus(@RequestParam Integer id, @RequestParam String status) {
		log.info(id + status);
		try{
			taskRepo.updateStatus(id, status);
			return true;
		}catch (Exception e) {
			log.info(e.getMessage());
			return false;
		}
	}

}
