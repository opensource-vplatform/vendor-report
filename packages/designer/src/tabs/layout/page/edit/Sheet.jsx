import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  CheckBox,
  Radio,
  RadioGroup,
} from '@components/form';
import { Range } from '@components/range/Index';
import {
  setArea,
  setBlackAndWhite,
  setEditorVisible,
  setPageOrder,
  setShowBorder,
  setShowGridLine,
  setShowHeader,
} from '@store/layoutSlice/layoutSlice';
import { rangeToFormula } from '@utils/printUtil';
import { getNamespace } from '@utils/spreadUtil';

import {
  Divider,
  HLayout,
  Padding,
  Title,
  VGroupItem,
  Wrapper,
} from '../../Component';

const checkboxStyle = { width: 'max-content' };

const ColumnToRow = styled.div`
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQiIGhlaWdodD0iNzQiIHZpZXdCb3g9IjAgMCA3NCA3NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijc0IiBoZWlnaHQ9Ijc0IiBmaWxsPSJyZ2IoMCwwLDAsMCkiLz4KPHBhdGggZD0iTTAgMTNINzRWNjJIMFYxM1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzMgMTRIMVY2MUg3M1YxNFpNMCAxM1Y2Mkg3NFYxM0gwWiIgZmlsbD0iIzY2NjY2NiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTggMjJWMjBIMTJWMjJMOCAyMlpNOCAyN1YyNkgxMlYyN0g4Wk04IDI5VjMwSDEyVjI5SDhaTTggMzNWMzJIMTJWMzNIOFpNMTUgMjZWMjdIMTlWMjZIMTVaTTE1IDIyVjIwSDE5VjIyTDE1IDIyWk0xNSAyOVYzMEgxOVYyOUgxNVpNMTUgMzNWMzJIMTlWMzNIMTVaTTIyIDI2VjI3SDI2VjI2SDIyWk0yMiAyMlYyMEgyNlYyMkwyMiAyMlpNMjIgMjlWMzBIMjZWMjlIMjJaTTIyIDMzVjMySDI2VjMzSDIyWk0yOSAyNlYyN0gzM1YyNkgyOVpNMjkgMjJWMjBIMzNWMjJMMjkgMjJaTTI5IDI5VjMwSDMzVjI5SDI5Wk0yOSAzM1YzMkgzM1YzM0gyOVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzQgMTlINlYyM0gzNFYxOVpNNiAzNFYyNEgxM1YzNEg2Wk0xNCAzNEgyMFYyNEgxNFYzNFpNMjcgMzRIMjFWMjRIMjdWMzRaTTI4IDM0SDM0VjI0SDI4VjM0Wk01IDE4VjM1SDM1VjE4SDVaIiBmaWxsPSIjNjY2NjY2Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCA0M1Y0MUgxMlY0M0w4IDQzWk04IDQ4VjQ3SDEyVjQ4SDhaTTggNTBWNTFIMTJWNTBIOFpNOCA1NFY1M0gxMlY1NEg4Wk0xNSA0N1Y0OEgxOVY0N0gxNVpNMTUgNDNWNDFIMTlWNDNMMTUgNDNaTTE1IDUwVjUxSDE5VjUwSDE1Wk0xNSA1NFY1M0gxOVY1NEgxNVpNMjIgNDdWNDhIMjZWNDdIMjJaTTIyIDQzVjQxSDI2VjQzTDIyIDQzWk0yMiA1MFY1MUgyNlY1MEgyMlpNMjIgNTRWNTNIMjZWNTRIMjJaTTI5IDQ3VjQ4SDMzVjQ3SDI5Wk0yOSA0M1Y0MUgzM1Y0M0wyOSA0M1pNMjkgNTBWNTFIMzNWNTBIMjlaTTI5IDU0VjUzSDMzVjU0SDI5WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zNCA0MEg2VjQ0SDM0VjQwWk02IDU1VjQ1SDEzVjU1SDZaTTE0IDU1SDIwVjQ1SDE0VjU1Wk0yNyA1NUgyMVY0NUgyN1Y1NVpNMjggNTVIMzRWNDVIMjhWNTVaTTUgMzlWNTZIMzVWMzlINVoiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MiAyMlYyMEg0NlYyMkw0MiAyMlpNNDIgMjdWMjZINDZWMjdINDJaTTQyIDI5VjMwSDQ2VjI5SDQyWk00MiAzM1YzMkg0NlYzM0g0MlpNNDkgMjZWMjdINTNWMjZINDlaTTQ5IDIyVjIwSDUzVjIyTDQ5IDIyWk00OSAyOVYzMEg1M1YyOUg0OVpNNDkgMzNWMzJINTNWMzNINDlaTTU2IDI2VjI3SDYwVjI2SDU2Wk01NiAyMlYyMEg2MFYyMkw1NiAyMlpNNTYgMjlWMzBINjBWMjlINTZaTTU2IDMzVjMySDYwVjMzSDU2Wk02MyAyNlYyN0g2N1YyNkg2M1pNNjMgMjJWMjBINjdWMjJMNjMgMjJaTTYzIDI5VjMwSDY3VjI5SDYzWk02MyAzM1YzMkg2N1YzM0g2M1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjggMTlINDBWMjNINjhWMTlaTTQwIDM0VjI0SDQ3VjM0SDQwWk00OCAzNEg1NFYyNEg0OFYzNFpNNjEgMzRINTVWMjRINjFWMzRaTTYyIDM0SDY4VjI0SDYyVjM0Wk0zOSAxOFYzNUg2OVYxOEgzOVoiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MiA0M1Y0MUg0NlY0M0w0MiA0M1pNNDIgNDhWNDdINDZWNDhINDJaTTQyIDUwVjUxSDQ2VjUwSDQyWk00MiA1NFY1M0g0NlY1NEg0MlpNNDkgNDdWNDhINTNWNDdINDlaTTQ5IDQzVjQxSDUzVjQzTDQ5IDQzWk00OSA1MFY1MUg1M1Y1MEg0OVpNNDkgNTRWNTNINTNWNTRINDlaTTU2IDQ3VjQ4SDYwVjQ3SDU2Wk01NiA0M1Y0MUg2MFY0M0w1NiA0M1pNNTYgNTBWNTFINjBWNTBINTZaTTU2IDU0VjUzSDYwVjU0SDU2Wk02MyA0N1Y0OEg2N1Y0N0g2M1pNNjMgNDNWNDFINjdWNDNMNjMgNDNaTTYzIDUwVjUxSDY3VjUwSDYzWk02MyA1NFY1M0g2N1Y1NEg2M1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjggNDBINDBWNDRINjhWNDBaTTQwIDU1VjQ1SDQ3VjU1SDQwWk00OCA1NUg1NFY0NUg0OFY1NVpNNjEgNTVINTVWNDVINjFWNTVaTTYyIDU1SDY4VjQ1SDYyVjU1Wk0zOSAzOVY1Nkg2OVYzOUgzOVoiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAyMEwyMCA1MkwyMCA1M0wyMCA1NEwyMCA1NUwyMSA1NUwyMSA1NEwyMiA1NEwyMiA1M0wyMyA1M0wyMyA1MkwyNCA1MkwyNCA1MUwyNSA1MUwyNSA1MEwyNiA1MEwyNiA0OUwyNyA0OUwyNyA0OEwyOCA0OEwyOCA0N0wyOSA0N0wyOSA0NkwzMCA0NkwzMCA0NUwzMSA0NUwzMSA0NEwzMiA0NEwzMiA0M0wzMyA0M0wzMyA0MkwzNCA0MkwzNCA0MUwzNSA0MUwzNSA0MEwzNiA0MEwzNiAzOUwzNyAzOUwzNyAzOEwzOCAzOEwzOCAzN0wzOSAzN0wzOSAzNkw0MCAzNkw0MCAzNUw0MSAzNUw0MSAzNEw0MiAzNEw0MiAzM0w0MyAzM0w0MyAzMkw0NCAzMkw0NCAzMUw0NSAzMUw0NSAzMEw0NiAzMEw0NiAyOUw0NyAyOUw0NyAyOEw0OCAyOEw0OCA1Mkw0NCA1Mkw0NCA1M0w0NSA1M0w0NSA1NEw0NiA1NEw0NiA1NUw0NyA1NUw0NyA1Nkw0OCA1Nkw0OCA1N0w0OSA1N0w0OSA1OEw1MSA1OEw1MSA1N0w1MiA1N0w1MiA1Nkw1MyA1Nkw1MyA1NUw1NCA1NUw1NCA1NEw1NSA1NEw1NSA1M0w1NiA1M0w1NiA1Mkw1MiA1Mkw1MiAyMkw1MiAyMUw1MiAyMEw1MCAyMEw1MCAyMUw0OSAyMUw0OSAyMkw0OCAyMkw0OCAyM0w0NyAyM0w0NyAyNEw0NiAyNEw0NiAyNUw0NSAyNUw0NSAyNkw0NCAyNkw0NCAyN0w0MyAyN0w0MyAyOEw0MiAyOEw0MiAyOUw0MSAyOUw0MSAzMEw0MCAzMEw0MCAzMUwzOSAzMUwzOSAzMkwzOCAzMkwzOCAzM0wzNyAzM0wzNyAzNEwzNiAzNEwzNiAzNUwzNSAzNUwzNSAzNkwzNCAzNkwzNCAzN0wzMyAzN0wzMyAzOEwzMiAzOEwzMiAzOUwzMSAzOUwzMSA0MEwzMCA0MEwzMCA0MUwyOSA0MUwyOSA0MkwyOCA0MkwyOCA0M0wyNyA0M0wyNyA0NEwyNiA0NEwyNiA0NUwyNSA0NUwyNSA0NkwyNCA0NkwyNCAyMEwyMCAyMFoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIgMThMMjIgNTBMMjIgNTFMMjIgNTJMMjIgNTNMMjMgNTNMMjMgNTJMMjQgNTJMMjQgNTFMMjUgNTFMMjUgNTBMMjYgNTBMMjYgNDlMMjcgNDlMMjcgNDhMMjggNDhMMjggNDdMMjkgNDdMMjkgNDZMMzAgNDZMMzAgNDVMMzEgNDVMMzEgNDRMMzIgNDRMMzIgNDNMMzMgNDNMMzMgNDJMMzQgNDJMMzQgNDFMMzUgNDFMMzUgNDBMMzYgNDBMMzYgMzlMMzcgMzlMMzcgMzhMMzggMzhMMzggMzdMMzkgMzdMMzkgMzZMNDAgMzZMNDAgMzVMNDEgMzVMNDEgMzRMNDIgMzRMNDIgMzNMNDMgMzNMNDMgMzJMNDQgMzJMNDQgMzFMNDUgMzFMNDUgMzBMNDYgMzBMNDYgMjlMNDcgMjlMNDcgMjhMNDggMjhMNDggMjdMNDkgMjdMNDkgMjZMNTAgMjZMNTAgNTBMNDYgNTBMNDYgNTFMNDcgNTFMNDcgNTJMNDggNTJMNDggNTNMNDkgNTNMNDkgNTRMNTAgNTRMNTAgNTVMNTEgNTVMNTEgNTZMNTMgNTZMNTMgNTVMNTQgNTVMNTQgNTRMNTUgNTRMNTUgNTNMNTYgNTNMNTYgNTJMNTcgNTJMNTcgNTFMNTggNTFMNTggNTBMNTQgNTBMNTQgMjBMNTQgMTlMNTQgMThMNTIgMThMNTIgMTlMNTEgMTlMNTEgMjBMNTAgMjBMNTAgMjFMNDkgMjFMNDkgMjJMNDggMjJMNDggMjNMNDcgMjNMNDcgMjRMNDYgMjRMNDYgMjVMNDUgMjVMNDUgMjZMNDQgMjZMNDQgMjdMNDMgMjdMNDMgMjhMNDIgMjhMNDIgMjlMNDEgMjlMNDEgMzBMNDAgMzBMNDAgMzFMMzkgMzFMMzkgMzJMMzggMzJMMzggMzNMMzcgMzNMMzcgMzRMMzYgMzRMMzYgMzVMMzUgMzVMMzUgMzZMMzQgMzZMMzQgMzdMMzMgMzdMMzMgMzhMMzIgMzhMMzIgMzlMMzEgMzlMMzEgNDBMMzAgNDBMMzAgNDFMMjkgNDFMMjkgNDJMMjggNDJMMjggNDNMMjcgNDNMMjcgNDRMMjYgNDRMMjYgMThMMjIgMThaIiBmaWxsPSIjMDA4MDgwIi8+Cjwvc3ZnPgo=);
    width: 74px;
    height: 74px;
`;

const RowToColumn = styled.div`
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQiIGhlaWdodD0iNzQiIHZpZXdCb3g9IjAgMCA3NCA3NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijc0IiBoZWlnaHQ9Ijc0IiBmaWxsPSJyZ2IoMCwwLDAsMCkiLz4KPHBhdGggZD0iTTAgMTNINzRWNjJIMFYxM1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzMgMTRIMVY2MUg3M1YxNFpNMCAxM1Y2Mkg3NFYxM0gwWiIgZmlsbD0iIzY2NjY2NiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTggMjJWMjBIMTJWMjJIOFpNOCAyN1YyNkgxMlYyN0g4Wk04IDI5VjMwSDEyVjI5SDhaTTggMzNWMzJIMTJWMzNIOFpNMTUgMjZWMjdIMTlWMjZIMTVaTTE1IDIyVjIwSDE5VjIySDE1Wk0xNSAyOVYzMEgxOVYyOUgxNVpNMTUgMzNWMzJIMTlWMzNIMTVaTTIyIDI2VjI3SDI2VjI2SDIyWk0yMiAyMlYyMEgyNlYyMkgyMlpNMjIgMjlWMzBIMjZWMjlIMjJaTTIyIDMzVjMySDI2VjMzSDIyWk0yOSAyNlYyN0gzM1YyNkgyOVpNMjkgMjJWMjBIMzNWMjJIMjlaTTI5IDI5VjMwSDMzVjI5SDI5Wk0yOSAzM1YzMkgzM1YzM0gyOVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzQgMTlINlYyM0gzNFYxOVpNNiAzNFYyNEgxM1YzNEg2Wk0xNCAzNEgyMFYyNEgxNFYzNFpNMjcgMzRIMjFWMjRIMjdWMzRaTTI4IDM0SDM0VjI0SDI4VjM0Wk01IDE4VjM1SDM1VjE4SDVaIiBmaWxsPSIjNjY2NjY2Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCA0M1Y0MUgxMlY0M0w4IDQzWk04IDQ4VjQ3SDEyVjQ4SDhaTTggNTBWNTFIMTJWNTBIOFpNOCA1NFY1M0gxMlY1NEg4Wk0xNSA0N1Y0OEgxOVY0N0gxNVpNMTUgNDNWNDFIMTlWNDNMMTUgNDNaTTE1IDUwVjUxSDE5VjUwSDE1Wk0xNSA1NFY1M0gxOVY1NEgxNVpNMjIgNDdWNDhIMjZWNDdIMjJaTTIyIDQzVjQxSDI2VjQzTDIyIDQzWk0yMiA1MFY1MUgyNlY1MEgyMlpNMjIgNTRWNTNIMjZWNTRIMjJaTTI5IDQ3VjQ4SDMzVjQ3SDI5Wk0yOSA0M1Y0MUgzM1Y0M0wyOSA0M1pNMjkgNTBWNTFIMzNWNTBIMjlaTTI5IDU0VjUzSDMzVjU0SDI5WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zNCA0MEg2VjQ0SDM0VjQwWk02IDU1VjQ1SDEzVjU1SDZaTTE0IDU1SDIwVjQ1SDE0VjU1Wk0yNyA1NUgyMVY0NUgyN1Y1NVpNMjggNTVIMzRWNDVIMjhWNTVaTTUgMzlWNTZIMzVWMzlINVoiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MiAyMlYyMEg0NlYyMkw0MiAyMlpNNDIgMjdWMjZINDZWMjdINDJaTTQyIDI5VjMwSDQ2VjI5SDQyWk00MiAzM1YzMkg0NlYzM0g0MlpNNDkgMjZWMjdINTNWMjZINDlaTTQ5IDIyVjIwSDUzVjIyTDQ5IDIyWk00OSAyOVYzMEg1M1YyOUg0OVpNNDkgMzNWMzJINTNWMzNINDlaTTU2IDI2VjI3SDYwVjI2SDU2Wk01NiAyMlYyMEg2MFYyMkw1NiAyMlpNNTYgMjlWMzBINjBWMjlINTZaTTU2IDMzVjMySDYwVjMzSDU2Wk02MyAyNlYyN0g2N1YyNkg2M1pNNjMgMjJWMjBINjdWMjJMNjMgMjJaTTYzIDI5VjMwSDY3VjI5SDYzWk02MyAzM1YzMkg2N1YzM0g2M1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjggMTlINDBWMjNINjhWMTlaTTQwIDM0VjI0SDQ3VjM0SDQwWk00OCAzNEg1NFYyNEg0OFYzNFpNNjEgMzRINTVWMjRINjFWMzRaTTYyIDM0SDY4VjI0SDYyVjM0Wk0zOSAxOFYzNUg2OVYxOEgzOVoiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MiA0M1Y0MUg0NlY0M0w0MiA0M1pNNDIgNDhWNDdINDZWNDhINDJaTTQyIDUwVjUxSDQ2VjUwSDQyWk00MiA1NFY1M0g0NlY1NEg0MlpNNDkgNDdWNDhINTNWNDdINDlaTTQ5IDQzVjQxSDUzVjQzTDQ5IDQzWk00OSA1MFY1MUg1M1Y1MEg0OVpNNDkgNTRWNTNINTNWNTRINDlaTTU2IDQ3VjQ4SDYwVjQ3SDU2Wk01NiA0M1Y0MUg2MFY0M0w1NiA0M1pNNTYgNTBWNTFINjBWNTBINTZaTTU2IDU0VjUzSDYwVjU0SDU2Wk02MyA0N1Y0OEg2N1Y0N0g2M1pNNjMgNDNWNDFINjdWNDNMNjMgNDNaTTYzIDUwVjUxSDY3VjUwSDYzWk02MyA1NFY1M0g2N1Y1NEg2M1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjggNDBINDBWNDRINjhWNDBaTTQwIDU1VjQ1SDQ3VjU1SDQwWk00OCA1NUg1NFY0NUg0OFY1NVpNNjEgNTVINTVWNDVINjFWNTVaTTYyIDU1SDY4VjQ1SDYyVjU1Wk0zOSAzOVY1Nkg2OVYzOUgzOVoiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSAyMkg1MUg1Mkg1M0g1NFYyM0g1M1YyNEg1MlYyNUg1MVYyNkg1MFYyN0g0OVYyOEg0OFYyOUg0N1YzMEg0NlYzMUg0NVYzMkg0NFYzM0g0M1YzNEg0MlYzNUg0MVYzNkg0MFYzN0gzOVYzOEgzOFYzOUgzN1Y0MEgzNlY0MUgzNVY0MkgzNFY0M0gzM1Y0NEgzMlY0NUgzMVY0NkgzMFY0N0gyOVY0OEgyOFY0OUgyN1Y1MEw1MSA1MFY0Nkg1MlY0N0g1M1Y0OEg1NFY0OUg1NVY1MEg1NlY1MUg1N1Y1M0g1NlY1NEg1NVY1NUg1NFY1Nkg1M1Y1N0g1MlY1OEg1MVY1NEwyMSA1NEgyMEgxOVY1MkgyMEwyMCA1MUgyMVY1MEgyMlY0OUgyM1Y0OEgyNFY0N0gyNVY0NkgyNlY0NUgyN1Y0NEgyOFY0M0gyOVY0MkgzMFY0MUgzMVY0MEgzMlYzOUgzM1YzOEgzNFYzN0gzNVYzNkgzNlYzNUgzN1YzNEgzOFYzM0gzOVYzMkg0MFYzMUg0MVYzMEg0MlYyOUg0M1YyOEg0NFYyN0g0NVYyNkgxOVYyMloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjEgMjBINTNINTRINTVINTZWMjFINTVWMjJINTRWMjNINTNWMjRINTJWMjVINTFWMjZINTBWMjdINDlWMjhINDhWMjlINDdWMzBINDZWMzFINDVWMzJINDRWMzNINDNWMzRINDJWMzVINDFWMzZINDBWMzdIMzlWMzhIMzhWMzlIMzdWNDBIMzZWNDFIMzVWNDJIMzRWNDNIMzNWNDRIMzJWNDVIMzFWNDZIMzBWNDdIMjlWNDhINTNWNDRINTRWNDVINTVWNDZINTZWNDdINTdWNDhINThWNDlINTlWNTFINThWNTJINTdWNTNINTZWNTRINTVWNTVINTRWNTZINTNWNTJIMjNIMjJIMjFWNTBIMjJWNDlIMjNWNDhIMjRWNDdIMjVWNDZIMjZWNDVIMjdWNDRIMjhWNDNIMjlWNDJIMzBWNDFIMzFWNDBIMzJWMzlIMzNWMzhIMzRWMzdIMzVWMzZIMzZWMzVIMzdWMzRIMzhWMzNIMzlWMzJINDBWMzFINDFWMzBINDJWMjlINDNWMjhINDRWMjdINDVWMjZINDZWMjVINDdWMjRIMjFWMjBaIiBmaWxsPSIjMDA4MDgwIi8+Cjwvc3ZnPgo=);
    width: 74px;
    height: 74px;
`;

export default function (props) {
    const { hostId } = props;
    const {
        showHeader,
        showGridLine,
        blackAndWhite,
        pageOrder,
        showBorder,
        rowStart,
        rowEnd,
        columnStart,
        columnEnd,
    } = useSelector(({ layoutSlice }) => layoutSlice);
    const { spread } = useSelector(({ appSlice }) => appSlice);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <VGroupItem>
                <HLayout
                    style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Title>打印区域：</Title>
                    <Range
                        value={rangeToFormula(
                            rowStart,
                            columnStart,
                            rowEnd,
                            columnEnd
                        )}
                        hostId={hostId}
                        onStartSelect={() => {
                            dispatch(setEditorVisible(false));
                        }}
                        onEndSelect={() => {
                            dispatch(setEditorVisible(true));
                        }}
                        onChange={(expression) => {
                            let rowStart = -1,
                                columnStart = -1,
                                rowEnd = -1,
                                columnEnd = -1;
                            if (expression && expression.trim() && spread) {
                                const GC = getNamespace();
                                const sheet = spread.getActiveSheet();
                                const range =
                                    GC.Spread.Sheets.CalcEngine.formulaToRange(
                                        sheet,
                                        expression
                                    );
                                if (range) {
                                    const { row, col, rowCount, colCount } =
                                        range;
                                    rowStart = row;
                                    columnStart = col;
                                    rowEnd =
                                        row == -1
                                            ? rowCount - 1
                                            : row + rowCount - 1;
                                    columnEnd =
                                        col == -1
                                            ? colCount - 1
                                            : col + colCount - 1;
                                    rowEnd = rowEnd < -1 ? -1:rowEnd;
                                    columnEnd = columnEnd < -1 ? -1:columnEnd;
                                }
                            }
                            dispatch(
                                setArea({
                                    rowStart,
                                    columnStart,
                                    rowEnd,
                                    columnEnd,
                                })
                            );
                        }}
                    ></Range>
                </HLayout>
            </VGroupItem>
            {/*<Divider title='打印标题'></Divider>
            <Padding>
                <VGroupItem>
                    <HLayout>
                        <Title>顶端标题行：</Title>
                    </HLayout>
                    <HLayout>
                        <Title>从左端重复的列数：</Title>
                    </HLayout>
                </VGroupItem>
    </Padding>*/}
            <Divider title='打印'></Divider>
            <Padding>
                <VGroupItem>
                    <CheckBox
                        title='网格线'
                        style={checkboxStyle}
                        value={showGridLine}
                        onChange={(val) => dispatch(setShowGridLine(val))}
                    ></CheckBox>
                    <CheckBox
                        title='单色打印'
                        style={checkboxStyle}
                        value={blackAndWhite}
                        onChange={(val) => dispatch(setBlackAndWhite(val))}
                    ></CheckBox>
                    <CheckBox
                        title='行和列标题'
                        style={checkboxStyle}
                        value={showHeader}
                        onChange={(val) => dispatch(setShowHeader(val))}
                    ></CheckBox>
                    <CheckBox
                        title='边框'
                        style={checkboxStyle}
                        value={showBorder}
                        onChange={(val) => dispatch(setShowBorder(val))}
                    ></CheckBox>
                </VGroupItem>
            </Padding>
            <Divider title='打印顺序'></Divider>
            <Padding>
                <HLayout>
                    <VGroupItem style={{ width: 120, flex: 'unset' }}>
                        <RadioGroup
                            value={pageOrder}
                            onChange={(val) => dispatch(setPageOrder(val))}
                        >
                            <Radio label='先列后行' value={1}></Radio>
                            <Radio label='先行后列' value={2}></Radio>
                        </RadioGroup>
                    </VGroupItem>
                    <VGroupItem>
                        {pageOrder == 1 ? (
                            <ColumnToRow></ColumnToRow>
                        ) : pageOrder == 2 ? (
                            <RowToColumn></RowToColumn>
                        ) : null}
                    </VGroupItem>
                </HLayout>
            </Padding>
        </Wrapper>
    );
}
