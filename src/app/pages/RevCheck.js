import React, { Component } from 'react';
import moment from 'moment';

import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import Spinning from 'grommet/components/icons/Spinning';
import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';

import Helpers from '../helpers';
import Api from '../api';

class RevCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      finalDate: '',
      summary: {},
      loadingData: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { startDate, finalDate } = this.state;
    if (!startDate || !finalDate) return;

    this.setState({ loadingData: true });
    Api.stone.getSales({
      startDate: moment(startDate, 'D/M/YYYY H:mm').format('YYYY-MM-DD'),
      finalDate: moment(finalDate, 'D/M/YYYY H:mm').format('YYYY-MM-DD'),
      merchantIds: [...Helpers.storage.getUserData().stone_code_collection],
    }).then((r) => {
      const summary = {};
      r.data.forEach((t) => {
        const date = moment.utc(t.presentation_date).format('DD/MM/YYYY H-m');
        if (moment(date, 'DD/MM/YYYY H-m').isBefore(moment(startDate, 'D/M/YYYY H:mm'))
          || moment(date, 'DD/MM/YYYY H-m').isAfter(moment(finalDate, 'D/M/YYYY H:mm'))) {
          return;
        }

        if (summary[`${t.card.brand} - ${t.card.funding_account}`]) {
          summary[`${t.card.brand} - ${t.card.funding_account}`] += t.gross_amount;
          return;
        }

        summary[`${t.card.brand} - ${t.card.funding_account}`] = t.gross_amount;
      });

      this.setState({ summary, loadingData: false });
    }, e => console.log(e));
  }


  render() {
    const {
      startDate,
      finalDate,
      summary,
      loadingData,
    } = this.state;

    return (
      <Box pad="medium" full>
        <Columns>
          <Box size="medium">
            <Form compact style={{ marginBottom: 40 }}>
              <FormField label="De:">
                <DateTime
                  value={startDate}
                  format="D/M/YYYY H:mm"
                  onChange={date => this.setState({ startDate: date })}
                />
              </FormField>
              <FormField label="Até:">
                <DateTime
                  value={finalDate}
                  format="D/M/YYYY H:mm"
                  onChange={date => this.setState({ finalDate: date })}
                />
              </FormField>
              {
                loadingData
                  ? <Spinning style={{ marginTop: 20 }} />
                  : (
                    <Button
                      disabled={loadingData}
                      style={{ marginTop: 20 }}
                      onClick={this.onSubmit}
                      label="Checar Valores"
                    />
                  )
              }
            </Form>
          </Box>

          <Box>
            <Table>
              <TableHeader
                labels={['Modalidade', 'Valor']}
              />
              <tbody>
                {
                  Object.keys(summary).map(k => (
                    <TableRow key={k}>
                      <td>{k}</td>
                      <td>
                        {`R$ ${(summary[k] / 100).toFixed(2)}`}
                      </td>
                    </TableRow>
                  ))
                }
                <TableRow>
                  <td>Total</td>
                  <td>
                    R$&nbsp;
                    {
                      (Object.values(summary).reduce((a, b) => a + b, 0) / 100).toFixed(2)
                    }
                  </td>
                </TableRow>
              </tbody>
            </Table>
          </Box>
        </Columns>
      </Box>
    );
  }
}

export default RevCheck;
