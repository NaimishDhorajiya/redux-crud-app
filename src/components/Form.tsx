import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, editData, setEditMode } from "../features/dataSlice";
import { RootState, AppDispatch } from "../app/store";

const Form: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const editItem = useSelector((state: RootState) => state.data.editItem);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        email: editItem.email,
        phone: editItem.phone,
        address: editItem.address,
      });
    }
  }, [editItem]);

  const validate = () => {
    const newErrors = { name: "", email: "", phone: "", address: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is incorrect";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (editItem) {
        dispatch(editData(formData));
      } else {
        dispatch(addData(formData));
      }
      setFormData({ name: "", email: "", phone: "", address: "" });
      dispatch(setEditMode(null)); // Reset edit mode
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <small className="text-danger">{errors.name}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <small className="text-danger">{errors.phone}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && (
          <small className="text-danger">{errors.address}</small>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        {editItem ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default Form;
