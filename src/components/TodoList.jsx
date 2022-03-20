import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTodo } from '../store/todoToolkit'
import './TodoList.css'
function TodoList() {
	const state = useSelector((state) => state.todo.todos)
	const dispatch = useDispatch()
	const deleteHandler = (e) => {
		dispatch(actionTodo.todosDelete(e.target.id))
	}
	const checkboxHandler = (e) => {
		dispatch(actionTodo.chekboxTodo(e.target.id))
	}
	return (
		<ul>
			{state.map((el) => (
				<li className={el.completed ? 'done' : 'task'} key={el.id}>
					<div className='block'>
						<input
							className='checkbox'
							onChange={checkboxHandler}
							id={el.id}
							checked={el.completed}
							type='checkbox'
						/>
						<p className='title'>{el.title}</p>
						<p className='date'>{el.date}</p>

						<button
							className='listbtn'
							type='submit'
							id={el.id}
							onClick={deleteHandler}
						>
							delete
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}

export default TodoList
