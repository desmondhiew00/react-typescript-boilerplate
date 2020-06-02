import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Form as AntdForm, Radio } from 'antd';
import { Formik, Form, Field } from 'formik';
import _ from 'lodash';
import { Breadcrumb, ListTableView, StatusTag, ListTableViewHandles } from '@components';
import { TextAreaInput, SelectInput } from '@components/form';
import { required } from '@utils/form-validator.utils';
import { Layout as FormLayout } from '@components/form/FormItem/FormLayout';
import { useTranslation } from 'react-i18next';
import { translations, LanguageKey } from 'locales/i18n';
import { getUsers } from '@api/users.api';
import { columnSorter } from '@utils/antd.utils';

// Types
import { RadioChangeEvent } from 'antd/lib/radio';

import './HomePage.scss';

export function HomePage() {
  const { t, i18n } = useTranslation();
  const counterRef = useRef<CounterHandles>(null);
  const tableRef = useRef<ListTableViewHandles>(null);

  const handleLanguageChange = (event: RadioChangeEvent) => {
    const language = event.target.value as LanguageKey;
    i18n.changeLanguage(language);
  };

  const getData = async p => {
    try {
      const res = await getUsers(p);
      const { rows, count } = res.data.payload;
      return Promise.resolve({ rows, count });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <div className="home-page">
        <Breadcrumb title="Home page" subTitle="Home page description" />

        <div className="m-5">
          <Card className="mb-5">
            <Formik onSubmit={v => console.log('Select Input Submit: ', v)} initialValues={{}}>
              <Form>
                <Field
                  name="userId"
                  label="User"
                  component={SelectInput}
                  api={{
                    url: '/users',
                    method: 'get',
                    rowsKey: 'payload.rows',
                    totalKey: 'payload.count',
                    infiniteScroll: true,
                    limit: 30
                  }}
                  mode="multiple"
                  valueKey="id"
                  onSelect={(v, o, r) => console.log('onSelect: ', { v, o, r })}
                  onChange={(v, o, r) => console.log('onChange: ', { v, o, r })}
                  optionRender={o => `${o.id}: ${o.name}`}
                />
                <Button htmlType="submit">Submit</Button>
              </Form>
            </Formik>
          </Card>

          <Card className="mb-5">
            <ListTableView
              wrappedComponentRef={tableRef}
              columns={columns()}
              getData={getData}
              selectable
              // eslint-disable-next-line no-console
              onSelect={(a, b) => console.log({ a, b })}
              draggable
              // eslint-disable-next-line no-console
              onDragOver={r => console.log('onDragOver: ', r)}
            />
          </Card>

          <Card title="Environments" size="small">
            <span className="text-red-400">Responsive Text Color</span>
            <div className="text-blue-600 md:text-red-600 lg:text-black">
              {_.map(process.env, (value: string, key: string) => (
                <div key={key}>
                  <span className="colon text-gray-600">{key}</span>
                  {value}
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-5" title="Counter by forwardRef" size="small">
            <Counter ref={counterRef} label="Hello Counter" />
            <Button
              onClick={() => {
                counterRef.current?.updateCount(counterRef.current.count + 1);
              }}
            >
              +1
            </Button>
          </Card>

          <Card className="mt-5" title="Sample Formik" size="small">
            <SampleForm />
          </Card>

          <Card className="mt-5" title="Language" size="small">
            <p>{t(translations.title())}</p>
            <p>{t(translations.demo.description())}</p>
            <Radio.Group onChange={handleLanguageChange} value={i18n.language}>
              <Radio value="en">English</Radio>
              <Radio value="cn">Chinese</Radio>
              <Radio value="ja">Japanese</Radio>
            </Radio.Group>
          </Card>
        </div>
      </div>
    </>
  );
}

type CounterHandles = {
  count: number;
  updateCount: (number: number) => void;
};
const Counter = forwardRef((props: { label: string }, ref: React.Ref<CounterHandles>) => {
  const { label } = props;
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    count,
    updateCount
  }));

  const updateCount = (val: number): void => {
    setCount(val);
  };

  return (
    <div>
      <h3>{label}</h3>
      <h4>Count: {count}</h4>
    </div>
  );
});

const SampleForm = () => {
  return (
    // eslint-disable-next-line no-console
    <Formik onSubmit={formValue => console.log('onSubmit: ', formValue)} initialValues={{}}>
      <Form>
        <Field label="Name" name="name" component={TextAreaInput} validate={required} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <AntdForm.Item {...FormLayout.tailDefault} style={{ textAlign: 'left' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </AntdForm.Item>
      </Form>
    </Formik>
  );
};

const columns = (): object[] => {
  const c = [
    // { title: 'Name', dataIndex: 'name', sorter: columnSorter.string('name') },
    { title: 'Name', render: u => `User ${u.id}`, sorter: columnSorter.number('id') },
    { title: 'Email', dataIndex: 'email', width: 500 },
    {
      title: 'Active',
      dataIndex: 'active',
      width: 100,
      align: 'center',
      render: (active: boolean) => <StatusTag status={active ? 'Active' : 'Inactive'} />
    }
  ];
  return c;
};
