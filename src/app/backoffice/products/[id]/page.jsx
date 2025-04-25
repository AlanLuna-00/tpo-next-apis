export default function ProductByIdBackoffice({ params }) {
    return (
        <div>
            <h1>Product By Id Backoffice</h1>
            <p>Aca estaria la vista del producto con el id: {params.id} (solo podrian ingresar admins)</p>
        </div>
    )
}