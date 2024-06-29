import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'bootstrap';
import FormImage from "../FormImage";

export default function EditProfileModal({
    updateProfile, editProfile, info, onClose
}) {
  const [profileImage, setProfileImage] = useState("");

  
  const modalEl = document.getElementById("editProfileModal")
  const editProfileModal = useMemo(() => {
    return modalEl ? new Modal(modalEl) : null;
  }, [modalEl])
  
  const [ profile, setProfile ] = useState ();

  useEffect(() => {
      if (editProfile) {
        setProfile(editProfile)
        editProfileModal?.show();
      } 
  }, [editProfile, editProfileModal]);

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("image", profile.image);
    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);
    formData.append("bio", profile.bio);
    formData.append("description", profile.description);
    formData.append("id", profile.id);
    return formData;
  }

  const resetProfile = () => {
    setProfile({
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      image: "",
    })
  }

  const onSubmit = (e) => {
    e?.preventDefault();
    if (isFormValid()) { 
      const blogForm = buildFormData();
      if (editProfile) {
        updateProfile(blogForm);
        // profile service of updating the profile
      }
      resetProfile();
      editProfileModal?.hide();
    }
  };

  const onCloseModal = () => {
    resetProfile();
    onClose();
    editProfileModal.hide();
  };

  const isFormValid = () => {
    const form = document.getElementById("profileForm");
    form?.classList?.add("was-validated");
    return form?.checkValidity();
  };

  const onImageChange = (e) => {
    if (e?.target?.files?.length) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setProfile({ ...profile, image: file });
    }
  };

  return (
    <div
      className="modal fade"
      id="editProfileModal"
      aria-labelledby="editProfileModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editProfileModalLabel">
              {"Edit Profile"}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onCloseModal}
            ></button>
          </div>
          {/* check all the code below */}
          <div className="modal-body">
            <form id="profileForm">
              <FormImage image={profileImage} onChange={onImageChange} />
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={profile?.firstName}
                  onChange={(e) => {
                    setProfile({ ...profile, firstName: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={profile?.lastName}
                  onChange={(e) => {
                    setProfile({ ...profile, lastName: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bio"
                  value={profile?.bio}
                  onChange={(e) => {
                    setProfile({ ...profile, bio: e.target.value });
                  }}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={onSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}