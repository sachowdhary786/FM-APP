import React, { useState } from 'react';
import useNavigate from 'react-router'

export default function CreatePlayer() {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        nationality: '',
        position: '',
        number: ''
    })

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newPlayer = { ...form };

        await fetch('http://localhost:5000/record/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlayer),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        setForm({ name: '', surname: '', nationality: '', position: '', number: '' })
        navigate("/");
    }

    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="surname"
                        value={form.surname}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nationality"
                        value={form.nationality}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="number"
                        value={form.number}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionGoalkeeper"
                            value="Goalkeeper"
                            checked={form.position === "Goalkeeper"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionGoalkeeper" className="form-check-label">Goalkeeper</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionDefender"
                            value="Defender"
                            checked={form.position === "Defender"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionDefender" className="form-check-label">Defender</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionMidfielder"
                            value="Midfielder"
                            checked={form.position === "Midfielder"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionMidfielder" className="form-check-label">Midfielder</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionAttacker"
                            value="Attacker"
                            checked={form.position === "Attacker"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionAttacker" className="form-check-label">Attacker</label>
                    </div>

                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}