export default `<?xml version="1.0" encoding="UTF-8"  ?>
<!-- Created with iReport - A designer for JasperReports -->
<!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN" "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd">
<jasperReport name="报表目录" columnCount="1" printOrder="Vertical" orientation="Landscape" pageWidth="842" pageHeight="595" columnWidth="730" columnSpacing="0" leftMargin="56" rightMargin="56" topMargin="70" bottomMargin="42" whenNoDataType="AllSectionsNoDetail" isTitleNewPage="false" isSummaryNewPage="false">
	<property name="ireport.scriptlethandling" value="0"/>
	<property name="ireport.encoding" value="UTF-8"/>
	<import value="java.util.*"/>
	<import value="net.sf.jasperreports.engine.*"/>
	<import value="net.sf.jasperreports.engine.data.*"/>
	<parameter name="budgetName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="lwPrice" isForPrompting="false" class="java.lang.String"/>
	<parameter name="clPrice" isForPrompting="false" class="java.lang.String"/>
	<parameter name="jxPrice" isForPrompting="false" class="java.lang.String"/>
	<parameter name="sum" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editScope" isForPrompting="false" class="java.lang.String"/>
	<parameter name="alreadyAudit" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projectName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="deDate" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTTITLE" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTSHORTNAME" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editRemark" isForPrompting="false" class="java.lang.String"/>
	<parameter name="fLFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="dJFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="totalPrice" isForPrompting="false" class="java.lang.String"/>
	<field name="class" class="java.lang.Class">
		<fieldDescription><![CDATA[class]]></fieldDescription>
	</field>
	<field name="remark" class="java.lang.String">
		<fieldDescription><![CDATA[remark]]></fieldDescription>
	</field>
	<field name="no" class="java.lang.String">
		<fieldDescription><![CDATA[no]]></fieldDescription>
	</field>
	<field name="name" class="java.lang.String">
		<fieldDescription><![CDATA[name]]></fieldDescription>
	</field>
	<field name="code" class="java.lang.String">
		<fieldDescription><![CDATA[code]]></fieldDescription>
	</field>
	<field name="class_1" class="java.lang.Class">
		<fieldDescription><![CDATA[class]]></fieldDescription>
	</field>
	<variable name="v1" class="java.lang.String" resetType="Report" calculation="Nothing">
		<variableExpression><![CDATA[$P{editRemark}]]></variableExpression>
	</variable>
	<background>
		<band height="0" isSplitAllowed="true">
			</band>
	</background>
	<title>
		<band height="35" isSplitAllowed="true">
			<textField isStretchWithOverflow="false" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="0" y="0" width="730" height="35" key="textField-14"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Top">
					<font fontName="宋体" pdfFontName="STSong-Light" size="18" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA[$P{ECRPT_REPORTTITLE}]]></textFieldExpression>
			</textField>
		</band>
	</title>
	<pageHeader>
		<band height="19" isSplitAllowed="false">
			<textField isStretchWithOverflow="false" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="0" y="0" width="730" height="19" key="textField-15"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
				<textElement textAlignment="Left" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="false" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["项目名称："+$P{projectName}]]></textFieldExpression>
			</textField>
		</band>
	</pageHeader>
	<columnHeader>
		<band height="34" isSplitAllowed="true">
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="0" y="0" width="79" height="17" key="textField-16"/>
				<box topBorder="1Point" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["序号"]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="79" y="0" width="318" height="17" key="textField-17"/>
				<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["图表名称"]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="397" y="0" width="92" height="17" key="textField-18"/>
				<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["编号"]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="489" y="0" width="241" height="17" key="textField-19"/>
				<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["备注"]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="0" y="17" width="79" height="17" key="textField-24"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["1"]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="79" y="17" width="318" height="17" key="textField-25"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["2"]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="397" y="17" width="92" height="17" key="textField-26"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["3"]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="489" y="17" width="241" height="17" key="textField-27"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="true" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA["4"]]></textFieldExpression>
			</textField>
		</band>
	</columnHeader>
	<detail>
		<band height="17" isSplitAllowed="true">
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="0" y="0" width="79" height="17" key="textField-20" stretchType="RelativeToTallestObject"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="false" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA[$F{no}]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="79" y="0" width="318" height="17" key="textField-21" stretchType="RelativeToTallestObject"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
				<textElement textAlignment="Left" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="false" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="397" y="0" width="92" height="17" key="textField-22" stretchType="RelativeToTallestObject"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="false" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA[$F{code}]]></textFieldExpression>
			</textField>
			<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None" hyperlinkTarget="Self">
				<reportElement x="489" y="0" width="241" height="17" key="textField-23" stretchType="RelativeToTallestObject"/>
				<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
				<textElement textAlignment="Center" verticalAlignment="Middle">
					<font fontName="宋体" pdfFontName="STSong-Light" size="11" isBold="false" isPdfEmbedded="true" pdfEncoding="UniGB-UCS2-H"/>
				</textElement>
				<textFieldExpression class="java.lang.String"><![CDATA[$F{remark}]]></textFieldExpression>
			</textField>
		</band>
	</detail>
	<columnFooter>
		<band height="0" isSplitAllowed="true">
			</band>
	</columnFooter>
	<pageFooter>
		<band height="0" isSplitAllowed="true">
			</band>
	</pageFooter>
	<summary>
		<band height="0" isSplitAllowed="true">
			</band>
	</summary>
</jasperReport>
`;