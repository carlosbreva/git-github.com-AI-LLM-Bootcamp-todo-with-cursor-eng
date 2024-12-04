'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit2 } from 'lucide-react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 text-center">
      <h1 className="text-2xl font-bold">Todo List App</h1>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-2 text-center mt-8">
      <p>&copy; 2023 Todo List App. All rights reserved.</p>
    </footer>
  )
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ))
    setEditingId(null)
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>My Todo List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Add a new task"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <Button onClick={addTodo}>Add</Button>
            </div>
            <ul className="space-y-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleComplete(todo.id)}
                  />
                  {editingId === todo.id ? (
                    <Input
                      type="text"
                      value={todo.text}
                      onChange={(e) => updateTodo(todo.id, e.target.value)}
                      onBlur={() => setEditingId(null)}
                      onKeyPress={(e) => e.key === 'Enter' && updateTodo(todo.id, e.currentTarget.value)}
                      autoFocus
                    />
                  ) : (
                    <span className={`flex-grow ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.text}
                    </span>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => setEditingId(todo.id)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {todos.length} task{todos.length !== 1 ? 's' : ''} remaining
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

