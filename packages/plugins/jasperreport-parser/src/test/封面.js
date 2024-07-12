export default `<?xml version="1.0" encoding="UTF-8"  ?>
<!-- Created with iReport - A designer for JasperReports -->
<!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN" "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd">
<jasperReport
		 name="封面"
		 columnCount="1"
		 printOrder="Vertical"
		 orientation="Landscape"
		 pageWidth="842"
		 pageHeight="595"
		 columnWidth="730"
		 columnSpacing="0"
		 leftMargin="56"
		 rightMargin="56"
		 topMargin="70"
		 bottomMargin="42"
		 whenNoDataType="AllSectionsNoDetail"
		 isTitleNewPage="false"
		 isSummaryNewPage="false">
	<property name="ireport.scriptlethandling" value="0" />
	<property name="ireport.encoding" value="UTF-8" />
	<import value="java.util.*" />
	<import value="net.sf.jasperreports.engine.*" />
	<import value="net.sf.jasperreports.engine.data.*" />

	<parameter name="budgetName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projectManager" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editUnit" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editDate" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editType" isForPrompting="false" class="java.lang.String"/>
	<parameter name="mainProjectName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editDATE" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editScope" isForPrompting="false" class="java.lang.String"/>
	<parameter name="authorUnit" isForPrompting="false" class="java.lang.String"/>
	<parameter name="fLFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="dJFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="totalPrice" isForPrompting="false" class="java.lang.String"/>
	<parameter name="onlyEditor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="onlyAuditor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="Conver_editScope" isForPrompting="false" class="java.lang.String"/>
	<parameter name="PP_QZZH" isForPrompting="false" class="java.lang.String"/>

		<background>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</background>
		<title>
			<band height="0"  isSplitAllowed="false" >
			</band>
		</title>
		<pageHeader>
			<band height="400"  isSplitAllowed="false" >
				<staticText>
					<reportElement
						x="0"
						y="165"
						width="730"
						height="30"
						key="staticText-2"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[第    册  共    册]]></text>
				</staticText>
				<staticText>
					<reportElement
						x="0"
						y="280"
						width="220"
						height="30"
						key="staticText-3"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[编制:]]></text>
				</staticText>
				<staticText>
					<reportElement
						x="0"
						y="310"
						width="220"
						height="30"
						key="staticText-4"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[复核:]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="35"
						width="730"
						height="84"
						key="textField-1"/>
					<box topBorder="None" topBorderColor="#000000" topPadding="5" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Top">
						<font fontName="宋体" pdfFontName="STSong-Light" size="24" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{mainProjectName}+"公路"+$P{editType}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="220"
						y="280"
						width="290"
						height="30"
						key="textField-2"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{onlyEditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="220"
						y="310"
						width="290"
						height="30"
						key="textField-3"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{onlyAuditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="340"
						width="730"
						height="30"
						key="textField-4"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{authorUnit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="370"
						width="730"
						height="30"
						key="textField-5"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{editDATE}.trim()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="119"
						width="730"
						height="30"
						key="textField-6"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["( "+($P{PP_QZZH}==null?"":$P{PP_QZZH})+" )"]]></textFieldExpression>
				</textField>
			</band>
		</pageHeader>
		<columnHeader>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</columnHeader>
		<detail>
			<band height="30"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="0"
						width="730"
						height="30"
						key="textField-7"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[""]]></textFieldExpression>
				</textField>
			</band>
		</detail>
		<columnFooter>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</columnFooter>
		<pageFooter>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</pageFooter>
		<summary>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</summary>
</jasperReport>
`;