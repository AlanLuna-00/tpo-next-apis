export default function UserByIdBackoffice({ params }) {
    return (
        <div>
            <h1>User By Id Backoffice</h1>
            <p>Aca estaria la vista del usuario con el id: {params.id} (solo podrian ingresar admins)</p>
        </div>
    )
}