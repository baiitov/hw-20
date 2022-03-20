import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const postTodo = createAsyncThunk(
	'todos/postTodo',
	async function (newData, { dispatch }) {
		const response = await fetch(
			'https://toolkitpost-default-rtdb.firebaseio.com/todo.json',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newData),
			},
		)
		const data = await response.json()
		dispatch(actionTodo.todosData({ ...newData, id: data.name }))
	},
)
export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function (_, { dispatch, rejectWithValue }) {
		try {
			const response = await fetch(
				'https://toolkitpost-default-rtdb.firebaseio.com/todo.json',
			)
			if (!response.ok) {
				throw new Error('error')
			}
			const data = await response.json()
			const getData = []
			for (const key in data) {
				getData.push({
					id: key,
					title: data[key].title,
					completed: data[key].completed,
					date: data[key].date,
				})
			}
			return getData
		} catch (e) {
			return rejectWithValue(e.message)
		}

		// dispatch(actionTodo.todosData(getData))
	},
)

const todoSlice = createSlice({
	name: 'todo',
	initialState: { todos: [], status: null, error: null },
	reducers: {
		todosData(state, action) {
			state.todos = [...state.todos, action.payload]
		},
		todosDelete(state, action) {
			console.log(action.payload)
			state.todos = state.todos.filter((el) => el.id !== action.payload)
		},
		chekboxTodo(state, action) {
			state.todos.map((el) => {
				if (el.id === action.payload) {
					el.completed = !el.completed
				}
			})
		},
	},
	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
			state.error = null
		},
		[fetchTodos.rejected]: (state, action) => {
			state.error = action.payload
			state.status = 'rejected'
		},
	},
})

export const actionTodo = todoSlice.actions
export default todoSlice
