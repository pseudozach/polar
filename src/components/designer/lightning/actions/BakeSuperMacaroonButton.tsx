import React from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { Button, Form, message } from 'antd';
import { usePrefixedTranslation } from 'hooks';
import { LitdNode } from 'shared/types';
import { useStoreActions } from 'store';

const BakeSuperMacaroonButton: React.FC<{ node: LitdNode }> = ({ node }) => {
  const { l } = usePrefixedTranslation(
    'cmps.designer.lightning.actions.BakeSuperMacaroonButton',
  );
  const { notify } = useStoreActions(s => s.app);
  const { bakeSuperMacaroon } = useStoreActions(s => s.lit);
  
  const bakeSuperMacaroonAsync = useAsyncCallback(async () => {
    try {
      const macaroon = await bakeSuperMacaroon({ node });
      
      // Copy to clipboard
      navigator.clipboard.writeText(macaroon).then(() => {
        message.success(l('copySuccess'), 2);
      });
      
      notify({
        message: l('success', { node: node.name }),
      });
    } catch (error: any) {
      notify({ message: l('error'), error });
    }
  });

  return (
    <Form.Item label={l('title')} colon={false}>
      <Button
        onClick={bakeSuperMacaroonAsync.execute}
        loading={bakeSuperMacaroonAsync.loading}
        block
        icon={<SafetyCertificateOutlined />}
      >
        {l('btnText')}
      </Button>
    </Form.Item>
  );
};

export default BakeSuperMacaroonButton;
