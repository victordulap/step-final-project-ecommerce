import React, { useCallback, useEffect, useState } from 'react';
import { Input, Typography, Form, Button, Divider, message, Row, Col, Image } from 'antd';
import { useDispatch } from 'react-redux';
import FormWrap from './FormWrap';
import { useNavigate } from 'react-router';
import WrappedSpinner from './WrappedSpinner';
import { STATE_STATUSES } from '../util/constants';
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { editBrand } from '../features/Brands/BrandsActions';

/**
 * @param model from state
 * @param isLoading from state
 * @param status from state
 * @param id from url
 * @param modelObject empty model with empty strings
 * @param title to show
 * @param getAction async action to get state
 * @param deleteAction async action to delete model
 * @param editAction async action to edit model
 * @param resetStatus async action to reset status
 * @param navUrl url to nav on succes delete
 * @param formFieldsArr form fields
 */
const ModelPage = ({
  stateMessage,
  model,
  isLoading,
  status,
  id,
  modelObject,
  title,
  resetStatus,
  deleteAction,
  editAction,
  navUrl,
  formFieldsArr,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditingMode, setIsEditingMode] = useState(stateMessage === 'edit');
  const [editValues, setEditValues] = useState(modelObject);

  const resetEditValues = useCallback(() => {
    if (model) {
      setEditValues(model);
    }
  }, [model]);

  useEffect(() => {
    resetEditValues();
  }, [resetEditValues]);

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      message.success(`${title} ${isEditingMode ? 'edited' : 'deleted'}!`);
      navigate(navUrl);
      dispatch(resetStatus());
    } else if (status === STATE_STATUSES.ERROR) message.error(`error occured ${isEditingMode ? 'editing' : 'deleting'} ${title}!`);
  }, [dispatch, isEditingMode, navUrl, navigate, resetStatus, status, title]);

  const deleteBrand = () => {
    if (model) {
      dispatch(deleteAction(model._id));
    }
  };

  const editModel = () => {
    if (model) {
      dispatch(editAction({ id: model._id, editedModel: editValues }));
    }
  };

  const handleEdit = (key, newValue) => {
    setEditValues((old) => ({ ...old, [key]: newValue }));
  };

  const formFields = model
    ? formFieldsArr.map((f) => {
        const Component = f.component;
        return {
          label: f.label,
          component: f.isId ? (
            <Input defaultValue={model._id} disabled />
          ) : (
            <Component value={editValues[f.name]} onChange={(e) => handleEdit(f.name, e.target.value)} disabled={!isEditingMode} />
          ),
        };
      })
    : [];

  if (isLoading) {
    return <WrappedSpinner />;
  }

  return (
    <>
      <Typography.Title className="mt-1" style={{ textTransform: 'capitalize' }} level={1}>
        {title}
      </Typography.Title>
      <FormWrap>
        <Row gutter={16}>
          <Col span={12}>
            <Form name="basic" labelCol={{ span: 4 }} initialValues={{ remember: true }} autoComplete="off">
              {formFields.map((f) => (
                <Form.Item key={`${title}-${f.label}`} label={f.label}>
                  {f.component}
                </Form.Item>
              ))}
            </Form>
          </Col>
          <Col span={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Image
                src={editValues.imgUrl || 'error'}
                fallback="data:image/png;base64,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"
              />
            </div>
          </Col>
        </Row>
        <Divider />

        <div className="flex-between">
          {isEditingMode ? (
            <>
              <Button
                onClick={() => {
                  setIsEditingMode(false);
                  resetEditValues();
                }}
                icon={<StopOutlined />}
                type="primary"
                loading={isLoading}
              >
                Cancel editing
              </Button>
              <Button
                onClick={() => {
                  editModel();
                }}
                icon={<EditOutlined />}
                loading={isLoading}
              >
                Confirm edit
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditingMode(true)} icon={<EditOutlined />} type="primary" loading={isLoading}>
                Edit {title}
              </Button>
              <Button onClick={deleteBrand} danger icon={<DeleteOutlined />} loading={isLoading}>
                Delete {title}
              </Button>
            </>
          )}
        </div>
      </FormWrap>
    </>
  );
};

export default ModelPage;
