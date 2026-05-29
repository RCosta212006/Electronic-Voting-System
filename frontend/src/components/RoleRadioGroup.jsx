import "../css/RoleRadioGroup.css";

function RoleRadioGroup({ value, onChange }) {
    return (
        <div className="role-radio-group">
            <div>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="voter"
                        checked={value === "voter"}
                        onChange={(event) => onChange(event.target.value)}
                    />
                    <span>User</span>
                </label>

                <label>
                    <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={value === "admin"}
                        onChange={(event) => onChange(event.target.value)}
                    />
                    <span>Admin</span>
                </label>
            </div>
        </div>
    );
}

export default RoleRadioGroup;
