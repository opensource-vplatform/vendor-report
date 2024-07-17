export default `<?xml version="1.0" encoding="UTF-8"  ?>
<!-- Created with iReport - A designer for JasperReports -->
<!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN" "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd">
<jasperReport
		 name="rpt08_03"
		 columnCount="1"
		 printOrder="Vertical"
		 orientation="Landscape"
		 pageWidth="842"
		 pageHeight="594"
		 columnWidth="758"
		 columnSpacing="0"
		 leftMargin="42"
		 rightMargin="42"
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
	<reportFont name="st" isDefault="false" fontName="新宋体" size="10" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" pdfFontName="Helvetica" pdfEncoding="Cp1250" isPdfEmbedded="false"/>

	<parameter name="editScope" isForPrompting="false" class="java.lang.String"/>
	<parameter name="budgetName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="competency" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projectName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="sgjszbf" isForPrompting="false" class="java.lang.Double"/>
	<parameter name="jhlr" isForPrompting="false" class="java.lang.Double"/>
	<parameter name="sj" isForPrompting="false" class="java.lang.Double"/>
	<parameter name="alreadyAudit" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="deDate" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTTITLE" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTSHORTNAME" isForPrompting="false" class="java.lang.String"/>
	<parameter name="dJFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="fLFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="totalPrice" isForPrompting="false" class="java.lang.String"/>
	<parameter name="heTongDuan" isForPrompting="false" class="java.lang.String"/>
	<parameter name="gcszd" isForPrompting="false" class="java.lang.String"/>
	<parameter name="assessor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="examinant" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditState" isForPrompting="false" class="java.lang.String"/>

	<field name="gcl" class="java.lang.Double">
		<fieldDescription><![CDATA[gcl]]></fieldDescription>
	</field>
	<field name="name" class="java.lang.String">
		<fieldDescription><![CDATA[name]]></fieldDescription>
	</field>
	<field name="unit" class="java.lang.String">
		<fieldDescription><![CDATA[unit]]></fieldDescription>
	</field>
	<field name="valueMap" class="java.lang.Object"/>
	<field name="code" class="java.lang.String"/>
	<field name="sgcl" class="java.lang.String"/>
	<field name="values" class="java.lang.Object"/>
	<field name="showQfw" class="java.lang.Boolean"/>

	<variable name="index" class="java.lang.Integer" resetType="Report" calculation="Count">
		<variableExpression><![CDATA[$V{index}.valueOf(1)]]></variableExpression>
		<initialValueExpression><![CDATA[1]]></initialValueExpression>
	</variable>

		<group  name="heji" isStartNewColumn="true" isStartNewPage="true" >
			<groupExpression><![CDATA[]]></groupExpression>
			<groupHeader>
			<band height="0"  isSplitAllowed="true" >
			</band>
			</groupHeader>
			<groupFooter>
			<band height="25"  isSplitAllowed="false" >
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="676"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-57"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map)$F{valueMap}).get("GCF")==0?((Map)$F{valueMap}).get("JAGCF"):((Map)$F{valueMap}).get("GCF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="635"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-58"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("SJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="199"
						y="0"
						width="35"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-59"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("DEZJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="513"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-60"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("QGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="472"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-61"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("CSF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="554"
						y="0"
						width="40"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-62"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("GFF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="594"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-63"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("LR")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="268"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-64"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("RGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="309"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-65"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("CLF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="350"
						y="0"
						width="40"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-66"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("JXF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="390"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-67"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("ZJF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="155"
						y="0"
						width="44"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-69"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{gcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="717"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-72"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{gcl}==0?0:
((Double)((Map)$F{valueMap}).get("GCF")).doubleValue()/$F{gcl}==0?((Double)((Map)$F{valueMap}).get("JAGCF")).doubleValue()/$F{gcl}:((Double)((Map)$F{valueMap}).get("GCF")).doubleValue()/$F{gcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="234"
						y="0"
						width="34"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-74"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map)$F{valueMap}).get("DESBF")-(Double)((Map)$F{valueMap}).get("SBSJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="431"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-75"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("SBGZF")]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="155"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-82"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[合计]]></text>
				</staticText>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="155"
						y="0"
						width="44"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-77"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{sgcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="199"
						y="0"
						width="35"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-79"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("DEZJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="234"
						y="0"
						width="34"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-81"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("DESBGZF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="268"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-83"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("RGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="309"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-85"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("CLF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="350"
						y="0"
						width="40"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-87"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("JXF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="390"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-89"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("ZJF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="431"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-91"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("SBGZF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="472"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-93"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("CSF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="513"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-95"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("QGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="554"
						y="0"
						width="40"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-97"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("GFF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="594"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-99"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("LR")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="635"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-101"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("SJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="676"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-103"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map)$F{valueMap}).get("GCF")==0?((Map)$F{values}).get("JAGCF"):((Map)$F{values}).get("GCF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="717"
						y="0"
						width="41"
						height="25"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-105"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{gcl}==0?"":
((Double)((Map)$F{valueMap}).get("GCF")).doubleValue()/$F{gcl}==0?((Map)$F{values}).get("JAGPRICE"):((Map)$F{values}).get("GCFPRICE")]]></textFieldExpression>
				</textField>
			</band>
			</groupFooter>
		</group>
		<background>
			<band height="1"  isSplitAllowed="true" >
			</band>
		</background>
		<title>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</title>
		<pageHeader>
			<band height="58"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="false" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="0"
						width="758"
						height="28"
						key="textField-39"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Top">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTTITLE}+$P{alreadyAudit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="28"
						width="431"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-1"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["建设项目名称："+$P{projectName}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="43"
						width="268"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-2"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制范围："+$P{editScope}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="658"
						y="43"
						width="59"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-36"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["OP_PC"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="594"
						y="43"
						width="64"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-37"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["第 " + String.valueOf($V{PAGE_NUMBER}.intValue()+new Integer(0).intValue()) + " 页"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="431"
						y="28"
						width="327"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-42"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{deDate}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="717"
						y="43"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-43"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTSHORTNAME}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="431"
						y="43"
						width="163"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-44"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{fLFileName}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="268"
						y="43"
						width="163"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-45"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{dJFileName}]]></textFieldExpression>
				</textField>
			</band>
		</pageHeader>
		<columnHeader>
			<band height="64"  isSplitAllowed="true" >
				<staticText>
					<reportElement
						mode="Transparent"
						x="513"
						y="0"
						width="41"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-31"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[企业管理费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="199"
						y="0"
						width="35"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-32"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[定额直接费(元）]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="472"
						y="0"
						width="41"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-33"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[措施费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="24"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-36"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[序号]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="120"
						y="0"
						width="35"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-37"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[单位]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="155"
						y="0"
						width="44"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-38"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[工程量]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="268"
						y="20"
						width="41"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-40"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[人工费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="350"
						y="20"
						width="40"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-41"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[施工机械使用费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="390"
						y="20"
						width="41"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-42"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[合计]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="309"
						y="20"
						width="41"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-43"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[材料费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="58"
						y="0"
						width="62"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-44"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[工程名称]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="50"
						width="24"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-45"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[1]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="58"
						y="50"
						width="62"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-46"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[3]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="120"
						y="50"
						width="35"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-47"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[4]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="155"
						y="50"
						width="44"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-48"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[5]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="268"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-50"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[8]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="309"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-51"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[9]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="350"
						y="50"
						width="40"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-52"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[10]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="390"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-53"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[11]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="199"
						y="50"
						width="35"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-54"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[6]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="472"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-56"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[13]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="513"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-57"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[14]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="554"
						y="50"
						width="40"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-58"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[15]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="594"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-59"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[16]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="635"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-62"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[17]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="676"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-63"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[18]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="676"
						y="20"
						width="41"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-68"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[合计]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="717"
						y="20"
						width="41"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-69"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[单价]]></text>
				</staticText>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="594"
						y="0"
						width="41"
						height="20"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-33"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["利润\n(元)"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="635"
						y="0"
						width="41"
						height="20"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-34"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["税金\n(元)"]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="717"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-70"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[19]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="554"
						y="0"
						width="40"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-71"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[规费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="24"
						y="0"
						width="34"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-72"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[分项编号]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="24"
						y="50"
						width="34"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-73"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[2]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="234"
						y="0"
						width="34"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-75"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[定额设备购置费（元）]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="234"
						y="50"
						width="34"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-77"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[7]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="268"
						y="0"
						width="163"
						height="20"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-78"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[直接费（元）]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="431"
						y="0"
						width="41"
						height="50"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-79"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[设备购置费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="431"
						y="50"
						width="41"
						height="14"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-80"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[12]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="676"
						y="0"
						width="82"
						height="20"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-81"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<text><![CDATA[金额合计（元）]]></text>
				</staticText>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="594"
						y="20"
						width="41"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-51"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["费率（%）\n"+$P{jhlr}+"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="635"
						y="20"
						width="41"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-52"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["税率（%）\n"+$P{sj}+"%"]]></textFieldExpression>
				</textField>
			</band>
		</columnHeader>
		<detail>
			<band height="15"  isSplitAllowed="false" >
				<printWhenExpression><![CDATA[!"合计".equals($F{name})]]></printWhenExpression>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="676"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map)$F{valueMap}).get("GCF")==0?((Map)$F{valueMap}).get("JAGCF"):((Map)$F{valueMap}).get("GCF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="635"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-6"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("SJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="199"
						y="0"
						width="35"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-12"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("DEZJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="513"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-14"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("QGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="472"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-16"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("CSF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="554"
						y="0"
						width="40"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-17"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("GFF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="594"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-18"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("LR")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="268"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-19"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("RGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="309"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-20"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("CLF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="350"
						y="0"
						width="40"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-21"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("JXF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="390"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-22"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("ZJF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="120"
						y="0"
						width="35"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-24"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{unit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="155"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-25"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{gcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="58"
						y="0"
						width="62"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-26"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="24"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-27"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Integer"><![CDATA[$V{index}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="717"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-46"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{gcl}==0?0:
((Double)((Map)$F{valueMap}).get("GCF")).doubleValue()/$F{gcl}==0?((Double)((Map)$F{valueMap}).get("JAGCF")).doubleValue()/$F{gcl}:((Double)((Map)$F{valueMap}).get("GCF")).doubleValue()/$F{gcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="24"
						y="0"
						width="34"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-47"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{code}.replaceAll("-","～")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="234"
						y="0"
						width="34"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-49"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map)$F{valueMap}).get("DESBF")-(Double)((Map)$F{valueMap}).get("SBSJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="431"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-50"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map)$F{valueMap}).get("SBGZF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="155"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-76"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{sgcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="199"
						y="0"
						width="35"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-78"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("DEZJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="234"
						y="0"
						width="34"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-80"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("DESBGZF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="268"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-82"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("RGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="309"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-84"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("CLF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="350"
						y="0"
						width="40"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-86"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("JXF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="390"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-88"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("ZJF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="431"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-90"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("SBGZF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="472"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-92"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("CSF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="513"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-94"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("QGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="554"
						y="0"
						width="40"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-96"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("GFF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="594"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-98"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("LR")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="635"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-100"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((Map)$F{values}).get("SJ")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="676"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-102"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map)$F{valueMap}).get("GCF")==0?((Map)$F{values}).get("JAGCF"):((Map)$F{values}).get("GCF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="717"
						y="0"
						width="41"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-104"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{gcl}==0?"":
((Double)((Map)$F{valueMap}).get("GCF")).doubleValue()/$F{gcl}==0?((Map)$F{values}).get("JAGPRICE"):((Map)$F{values}).get("GCFPRICE")]]></textFieldExpression>
				</textField>
			</band>
		</detail>
		<columnFooter>
			<band height="15"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="394"
						y="0"
						width="364"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-40">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["复核："+$P{auditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="394"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-41"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制："+$P{editor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="189"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-53"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制："+$P{editor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="189"
						y="0"
						width="189"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-54">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["复核："+$P{auditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="378"
						y="0"
						width="190"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-55"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["审查："+$P{examinant}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="568"
						y="0"
						width="190"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-56"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["审核："+$P{assessor}]]></textFieldExpression>
				</textField>
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