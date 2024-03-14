"use client";
import React, { Component } from 'react';
import axios from 'axios';

const dummyOngoingClasses = [
    {
      id: 1,
      name: "Yoga Class",
      instructor: "John Doe",
      schedule: "Monday, Wednesday, Friday at 9:00 AM",
      duration: "1 hour",
      capacity: 20,
      enrolledStudents: 15,
      sales: 300,
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ullamcorper ante, at suscipit orci. Integer dictum sapien id lacus pretium, et viverra libero maximus."
    },
    {
      id: 2,
      name: "Pilates Class",
      instructor: "Jane Smith",
      schedule: "Tuesday, Thursday at 5:00 PM",
      duration: "45 minutes",
      capacity: 15,
      enrolledStudents: 10,
      sales: 250,
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ullamcorper ante, at suscipit orci. Integer dictum sapien id lacus pretium, et viverra libero maximus."
    },
    
  ];




class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Instructor' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      ], newName: '',
      newEmail: '',
      newRole: 'User',
      editingUserId: null,
      totalSales:0, ongoingClasses: dummyOngoingClasses , selectedClass: null
    };
  }
  
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddUser = () => {
    const { newName, newEmail, newRole, users } = this.state;
    const newUser = {
      id: users.length + 1,
      name: newName,
      email: newEmail,
      role: newRole,
    };
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
      newName: '',
      newEmail: '',
      newRole: 'User',
    }));
  };

  handleEditUser = (id) => {
    this.setState({ editingUserId: id });
  };

  handleSaveEdit = (id) => {
    this.setState({ editingUserId: null });
  };

  handleDeleteUser = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== id),
    }));
  };


  componentDidMount() {
    this.fetchUsers();
    this.fetchSales();
    this.fetchOngoingClasses();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      this.setState({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchSales = async () => {
    try {
      const response = await axios.get('/api/sales');
      this.setState({ totalSales: response.data.totalSales });
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  fetchOngoingClasses = async () => {
    try {
      const response = await axios.get('/api/classes/ongoing');
      this.setState({ ongoingClasses: response.data.ongoingClasses });
    } catch (error) {
      console.error('Error fetching ongoing classes:', error);
    }
  };

  deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      // After deletion, fetch updated user list
      this.fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  selectClass = (selectedClass) => {
    this.setState({ selectedClass });
  };

  render() {
    const { users, newName, newEmail, newRole, editingUserId, totalSales, ongoingClasses, selectedClass } = this.state;

    return (

       
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4">User Management</h1>

        <div className='bg-white rounded-lg shadow p-4'>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Ongoing Classes:</h2>
          <ul>{Array.isArray(ongoingClasses) && ongoingClasses.length > 0 ? (ongoingClasses.map((classItem) => (
            <li key={classItem.id} className="cursor-pointer" onClick={() => this.selectClass(classItem)}>
                {classItem.name}
            </li> 
          ))
          ) : (
            
        <li>No ongoing classes.</li>
    )}
    </ul>
          <p className="text-gray-600">Manage ongoing classes and view class details.</p>
        </div>

        {selectedClass && (
          <div className='selected-class-details'>
            <h2 className="text-xl font-semibold mb-2">{selectedClass.name} Details</h2>
            <p>{selectedClass.description}</p>
            <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
            <p><strong>Schedule:</strong> {selectedClass.schedule}</p>
            <p><strong>Duration:</strong> {selectedClass.duration}</p>
            <p><strong>Capacity:</strong> {selectedClass.capacity}</p>
            <p><strong>Enrolled Students:</strong> {selectedClass.enrolledStudents}</p>
            <p><strong>Sales:</strong> ${selectedClass.sales}</p>
            <p><strong>Details:</strong> {selectedClass.details}</p>
          </div>
        )}
</div><br></br>

<div className='bg-white rounded-lg shadow p-4'>
        <div>
          <h2 className="text-xl font-semibold mb-2">User Management </h2>
          <table className="border-separate border border-slate-400">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2">Name</th>
          <th className="border border-gray-400 px-4 py-2">Email</th>
          <th className="border border-gray-400 px-4 py-2">Role</th>
          <th className="border border-gray-400 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              {editingUserId === user.id ? (
                <input
                  type="text"
                  name="newName"
                  value={newName}
                  onChange={this.handleInputChange}
                />
              ) : (
                user.name
              )}
            </td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              {editingUserId === user.id ? (
                <button onClick={() => this.handleSaveEdit(user.id)}  className="bg-green-500 text-white py-1 px-2 rounded">Save</button>
              ) : (
                <>
                  <button onClick={() => this.handleEditUser(user.id)}  className="bg-blue-400 text-white py-1 px-2 rounded">Edit</button>
                  <button onClick={() => this.handleDeleteUser(user.id)} className="bg-red-400 text-white py-1 px-2 rounded">Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
          <h2 className="mt-4 mb-2">Add New User</h2>
          <input
            type="text"
            name="newName"
            value={newName}
            onChange={this.handleInputChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="newEmail"
            value={newEmail}
            onChange={this.handleInputChange}
            placeholder="Email"
          />
          <select name="newRole" value={newRole} onChange={this.handleInputChange}>
            <option value="User">User</option>
            <option value="Instructor">Instructor</option>
          </select>
          <button onClick={this.handleAddUser} className="bg-blue-500 text-white py-1 px-2 rounded" >Add User</button>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between border-b py-2">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => this.deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  {/* Add more actions like updating details or viewing enrolled classes */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
</div>

    );
  }
}

export default UserManagement;
