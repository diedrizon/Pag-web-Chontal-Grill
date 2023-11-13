import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Table, Image, Container, Row, Card, Col } from "react-bootstrap";
import axios from "axios";
import "../styles/HeaderAdministrador.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Nuevo estado para los datos filtrados
  const [formData, setFormData] = useState({
    ID_Categoria: "",
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Imagen: null,
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    reloadMenuData();
  }, []);

  useEffect(() => {
    const performFilter = () => {
      if (searchTerm) {
        const filtered = data.filter(
          (item) =>
            item.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    };
    performFilter();
  }, [searchTerm, data]);

  const reloadMenuData = () => {
    axios.get("http://localhost:5000/menu/read").then((response) => {
      setData(response.data);
      setFilteredData(response.data); // Establece los datos filtrados aquí también
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData({ ...formData, Imagen: reader.result.split(",")[1] });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!formData.ID_Categoria) {
      formIsValid = false;
      tempErrors["ID_Categoria"] = "ID de categoría es requerido";
    }

    if (!formData.Nombre) {
      formIsValid = false;
      tempErrors["Nombre"] = "El nombre es requerido";
    }

    if (!formData.Descripcion) {
      formIsValid = false;
      tempErrors["Descripcion"] = "La descripción es requerida";
    }

    if (!formData.Precio) {
      formIsValid = false;
      tempErrors["Precio"] = "El precio es requerido";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const renderValidationError = (field) => {
    if (errors[field]) {
      return <div style={{ color: "red" }}>{errors[field]}</div>;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (window.confirm("¿Está seguro que desea guardar este menú?")) {
        axios
          .post("http://localhost:5000/menu/create", formData)
          .then((response) => {
            alert("Menú guardado con éxito!");
            reloadMenuData();
            resetForm();
          });
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (window.confirm("¿Está seguro que desea actualizar este menú?")) {
        axios
          .put(`http://localhost:5000/menu/update/${currentItem.ID_Menu}`, formData)
          .then((response) => {
            alert("Menú actualizado con éxito!");
            reloadMenuData();
            setIsEditing(false);
            resetForm();
          });
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este menú?")) {
      axios.delete(`http://localhost:5000/menu/delete/${id}`).then((response) => {
        alert("Menú eliminado con éxito!");
        reloadMenuData();
      });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  return (
    <div className="body-content">
      <Container className="mt-custom">
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Gestión de Menu</Card.Title>
            <Form onSubmit={isEditing ? handleUpdate : handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCategoryID">
                    <Form.Label>ID Categoría</Form.Label>
                    <Form.Control
                      type="number"
                      name="ID_Categoria"
                      value={formData.ID_Categoria}
                      onChange={handleChange}
                      min={1}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="Nombre"
                      value={formData.Nombre}
                      onChange={handleChange}
                      maxLength={100}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      type="text"
                      name="Descripcion"
                      value={formData.Descripcion}
                      onChange={handleChange}
                      maxLength={200}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="Precio"
                      value={formData.Precio}
                      onChange={handleChange}
                      min={0}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              <Col md={6}>
        <Form.Group controlId="formImage">
          <Form.Label>Imagen</Form.Label>
          {/* Agregamos la ref al input de archivo */}
          <Form.Control type="file" onChange={handleFileChange} ref={fileInputRef} />
        </Form.Group>
      </Col>
                <Col md={6}>
                  <Form.Group
                    controlId="formImagePreview"
                    className="mt-3 mb-3"
                  >
                    <Form.Label className="d-block text-center">
                      Vista Previa
                    </Form.Label>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ border: "1px solid #ddd", height: "128px" }}
                    >
                      {previewUrl && (
                        <Image
                          src={previewUrl}
                          alt="Vista previa"
                          thumbnail
                          style={{ maxWidth: "128px", maxHeight: "128px" }}
                        />
                      )}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="me-2 mb-2">
                {isEditing ? "Actualizar" : "Guardar"}
              </Button>
              <Button variant="secondary" onClick={resetForm} className="mb-2">
                Limpiar
              </Button>
            </Form>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Form.Group
                  controlId="formSearch"
                  style={{ marginBottom: "10px" }}
                >
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
                <Table striped bordered hover responsive>
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
                          <Button
                            style={{ marginRight: "10px" }}
                            variant="warning"
                            onClick={() => handleEdit(item)}
                          >
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
