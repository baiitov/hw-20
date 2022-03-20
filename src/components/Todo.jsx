import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import todoSlice, { actionTodo } from '../store/todoToolkit'
import TodoList from './TodoList'
import { postTodo } from '../store/todoToolkit'
import { fetchTodos } from '../store/todoToolkit'
import './Todo.css'
function Todo() {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const titleHandler = (e) => {
		setTitle(e.target.value)
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (title.trim() === '') {
			return
		}
		setTitle('')
		const newData = {
			title: title,
			id: Math.random().toString(),
			date: new Date().toLocaleDateString(),
			completed: false,
		}
		dispatch(postTodo(newData))
	}
	return (
		<form onSubmit={onSubmitHandler}>
			<div className='container'>
				<input
					placeholder='New Task...'
					className='Input'
					value={title}
					onChange={titleHandler}
					type='text'
				/>
				<button className='btn'>add</button>
				<TodoList />
			</div>
		</form>
	)
}

export default Todo
