import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditBranchModal = ({ show, handleClose, branch, handleSave }) => {
    const [formData, setFormData] = useState({
        branch_type: "",
        country: "",
        state: "",
        district: "",
        address: ""
    });

    useEffect(() => {
        if (branch) {
            setFormData(branch);
        }
    }, [branch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBranchType">
                        <Form.Label>Branch Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="branch_type"
                            value={formData.branch_type}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDistrict">
                        <Form.Label>District</Form.Label>
                        <Form.Control
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditBranchModal;
