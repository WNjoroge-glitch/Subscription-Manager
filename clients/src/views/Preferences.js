import React from 'react'

function Preferences() {
    return (
        <div>
            <h1>Preferences</h1>
            <form>
                <label> Notify Via
                   <select name ="notify">
                       
                       <option value="email">Email</option>
                       <option value="phone">Phone</option>

                   </select>
                </label>
                <label> Currency
                <select name ="currency">
                       <option value="ksh">Ksh</option>
                       <option value="usd">USD</option>
                       <option value="euro">Euro</option>

                   </select>
                </label>
            </form>
        </div>
    )
}

export default Preferences
