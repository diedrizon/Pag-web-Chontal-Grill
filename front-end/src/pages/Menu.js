import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Table,
  Image,
  Container,
  Row,
  Card,
  Col,
} from "react-bootstrap";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    ID_Categoria: "",
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Imagen: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    reloadMenuData();
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = data.filter(
        (item) =>
          item.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    } else {
      reloadMenuData();
    }
  }, [searchTerm, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData({
          ...formData,
          Imagen: reader.result.split(",")[1],
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/menu/create", formData)
      .then((response) => {
        console.log(response.data);
        reloadMenuData();
        resetForm();
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/menu/update/${currentItem.ID_Menu}`, formData)
      .then((response) => {
        console.log(response.data);
        reloadMenuData();
        setIsEditing(false);
        resetForm();
      });
  };

  const handleEdit = (item) => {
    const previewImage = `data:image/png;base64,${item.ImagenBase64}`;
    setPreviewUrl(previewImage);
    setFormData({
      ...item,
      Imagen: item.ImagenBase64,
    });
    setIsEditing(true);
    setCurrentItem(item);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/menu/delete/${id}`).then((response) => {
      console.log(response.data);
      reloadMenuData();
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const reloadMenuData = () => {
    axios.get("http://localhost:5000/menu/read").then((response) => {
      setData(response.data);
    });
  };

  const resetForm = () => {
    setFormData({
      ID_Categoria: "",
      Nombre: "",
      Descripcion: "",
      Precio: "",
      Imagen: null,
    });
    setPreviewUrl(null);
  };

  return (
    <div>
    <AdminHeader />
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Gestión de Menu</Card.Title>
      <Row>
        <Col>
          <Form onSubmit={isEditing ? handleUpdate : handleSubmit}>
            <Form.Group controlId="formCategoryID">
              <Form.Label>ID Categoría</Form.Label>
              <Form.Control
                type="number"
                name="ID_Categoria"
                value={formData.ID_Categoria}
                onChange={handleChange}
                min={1} // Valor mínimo permitido
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
                maxLength={100} // Límite de caracteres para el campo Nombre
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleChange}
                maxLength={200} // Límite de caracteres para el campo Descripción
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="Precio"
                value={formData.Precio}
                onChange={handleChange}
                min={0} // Valor mínimo permitido
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="formImagePreview">
              <Form.Label>Vista Previa</Form.Label>
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Vista previa"
                  thumbnail
                  style={{
                    width: "128px",
                    height: "128px",
                    marginBottom: "10px",
                  }}
                />
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              {isEditing ? "Actualizar" : "Guardar"}
            </Button>
            <Button
              variant="secondary"
              onClick={resetForm}
              style={{ marginBottom: "10px" }}
            >
              Limpiar
            </Button>
          </Form>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col>
          <Form.Group controlId="formSearch" style={{ marginBottom: "10px" }}>
            <Form.Label>Buscar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o descripción"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Menú</th>
                <th>ID Categoría</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.ID_Menu}>
                  <td>{item.ID_Menu}</td>
                  <td>{item.ID_Categoria}</td>
                  <td>{item.Nombre}</td>
                  <td>{item.Descripcion}</td>
                  <td>{item.Precio}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={`data:${item.MimeType};base64,${item.ImagenBase64}`}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(item)}>
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.ID_Menu)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default App;
