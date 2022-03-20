import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Todo from './components/Todo'
import { fetchTodos } from './store/todoToolkit'

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	return (
		<div className='App'>
			<Todo />
		</div>
	)
}

export default App
