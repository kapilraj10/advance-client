import React, { useState } from 'react'
import { createAdvance } from '../../api'
import toast from 'react-hot-toast'

const NewAdvance = ({ onCreated }) => {
    const [form, setForm] = useState({
        title: '', description: '', staffName: '', staffEmail: '', staffPhone: '', amount: '', startDate: '', type: 'Salary Advance', paymentMode: 'Cash', remarks: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = {
                ...form,
                amount: Number(form.amount),
                startDate: form.startDate || new Date().toISOString()
            }
            const res = await createAdvance(payload)
            toast.success('Advance created')
            setForm({ title: '', description: '', staffName: '', staffEmail: '', staffPhone: '', amount: '', startDate: '', type: 'Salary Advance', paymentMode: 'Cash', remarks: '' })
            if (onCreated) onCreated(res.data)
        } catch (err) {
            const msg = err?.response?.data?.msg || err.message || 'Create failed'
            toast.error(msg)
        } finally { setLoading(false) }
    }

    return (
        <div>
            <h4>Create Advance</h4>
            <form onSubmit={handleSubmit} className="row g-2">
                <div className="col-12">
                    <label className="form-label">Advance Title</label>
                    <input name="title" value={form.title} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows={2} />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Staff Name</label>
                    <input name="staffName" value={form.staffName} onChange={handleChange} className="form-control" required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Staff Email</label>
                    <input name="staffEmail" type="email" value={form.staffEmail} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Staff Phone</label>
                    <input name="staffPhone" value={form.staffPhone} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Advance Amount</label>
                    <input name="amount" value={form.amount} onChange={handleChange} className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input name="startDate" value={form.startDate} onChange={handleChange} type="date" className="form-control" required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Advance Type</label>
                    <select name="type" value={form.type} onChange={handleChange} className="form-select">
                        <option>Salary Advance</option>
                        <option>Expense Advance</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Payment Mode</label>
                    <select name="paymentMode" value={form.paymentMode} onChange={handleChange} className="form-select">
                        <option>Cash</option>
                        <option>Bank</option>
                        <option>Online</option>
                    </select>
                </div>

                <div className="col-12">
                    <label className="form-label">Remarks</label>
                    <textarea name="remarks" value={form.remarks} onChange={handleChange} className="form-control" rows={2} />
                </div>

                <div className="col-12 text-end">
                    <button className="btn btn-secondary me-2" type="reset" onClick={() => setForm({ title: '', description: '', staffName: '', staffEmail: '', staffPhone: '', amount: '', startDate: '', type: 'Salary Advance', paymentMode: 'Cash', remarks: '' })}>Reset</button>
                    <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Advance'}</button>
                </div>
            </form>
        </div>
    )
}

export default NewAdvance
