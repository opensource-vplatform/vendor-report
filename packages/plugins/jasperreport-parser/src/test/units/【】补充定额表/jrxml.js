export default `<?xml version="1.0" encoding="UTF-8"  ?>
<!-- Created with iReport - A designer for JasperReports -->
<!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN" "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd">
<jasperReport
		 name="rpt_BC03"
		 columnCount="1"
		 printOrder="Vertical"
		 orientation="Portrait"
		 pageWidth="595"
		 pageHeight="842"
		 columnWidth="483"
		 columnSpacing="0"
		 leftMargin="70"
		 rightMargin="42"
		 topMargin="42"
		 bottomMargin="42"
		 whenNoDataType="AllSectionsNoDetail"
		 isTitleNewPage="false"
		 isSummaryNewPage="false">
	<property name="ireport.scriptlethandling" value="0" />
	<property name="ireport.encoding" value="UTF-8" />
	<import value="java.util.*" />
	<import value="net.sf.jasperreports.engine.*" />
	<import value="net.sf.jasperreports.engine.data.*" />
	<reportFont name="st" isDefault="false" fontName="宋体" size="8" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" pdfFontName="Helvetica" pdfEncoding="Cp1250" isPdfEmbedded="false"/>

	<style 
		name="title"
		isDefault="false"
	>

		<conditionalStyle>
			<conditionExpression><![CDATA[$F{isTitle}]]></conditionExpression>
			<style 
				name="title"
				isDefault="false"
				hAlign="Center"
				isStyledText="false"
				isBold="true"
				isItalic="false"
				isUnderline="false"
				isStrikeThrough="false"
			/>
		</conditionalStyle>
	</style>

	<parameter name="editor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editScope" isForPrompting="false" class="java.lang.String"/>
	<parameter name="budgetName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="competency" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projectName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="deDate" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTTITLE" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTSHORTNAME" isForPrompting="false" class="java.lang.String"/>
	<parameter name="fLFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="dJFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="totalPrice" isForPrompting="false" class="java.lang.String"/>
	<parameter name="heTongDuan" isForPrompting="false" class="java.lang.String"/>
	<parameter name="examinant" isForPrompting="false" class="java.lang.String"/>
	<parameter name="assessor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="gcszd" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditState" isForPrompting="false" class="java.lang.String"/>

	<field name="no" class="java.lang.String"/>
	<field name="name" class="java.lang.String"/>
	<field name="unit" class="java.lang.String"/>
	<field name="sysCode" class="java.lang.String"/>
	<field name="xhl" class="java.lang.Double"/>
	<field name="deUnit" class="java.lang.String"/>
	<field name="deName" class="java.lang.String"/>
	<field name="isTitle" class="java.lang.Boolean"/>

		<background>
			<band height="0"  isSplitAllowed="true" >
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
						width="483"
						height="27"
						key="textField-31"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Top">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTTITLE}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="27"
						width="270"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-1"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Bottom" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["建设项目："+$P{projectName}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="42"
						width="355"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-28"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制范围："+$P{editScope}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="355"
						y="42"
						width="46"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-32"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["第 " + String.valueOf($V{PAGE_NUMBER}.intValue()+new Integer(0).intValue()) + " 页"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="401"
						y="42"
						width="53"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-33"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="16" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["OP_PC"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="454"
						y="42"
						width="29"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-35"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="10" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTSHORTNAME}]]></textFieldExpression>
				</textField>
			</band>
		</pageHeader>
		<columnHeader>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</columnHeader>
		<detail>
			<band height="15"  isSplitAllowed="false" >
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						style="title"
						mode="Transparent"
						x="0"
						y="0"
						width="36"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-46"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{no}!=null]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{no}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						style="title"
						mode="Transparent"
						x="36"
						y="0"
						width="177"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-47"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{no}!=null]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
					<textElement verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						style="title"
						mode="Transparent"
						x="213"
						y="0"
						width="57"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-48"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{no}!=null]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{unit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						style="title"
						mode="Transparent"
						x="270"
						y="0"
						width="104"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-49"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{no}!=null]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{sysCode}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="374"
						y="0"
						width="109"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-50"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{no}!=null &&$F{deUnit}==null]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{xhl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="483"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-51"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{deName}!=null]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{deName}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						style="title"
						mode="Transparent"
						x="374"
						y="0"
						width="109"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-52"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{deUnit}!=null]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="3"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{deUnit}]]></textFieldExpression>
				</textField>
			</band>
		</detail>
		<columnFooter>
			<band height="15"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="0"
						width="213"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-29">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["复核："+$P{auditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="270"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-30"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制："+$P{editor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="120"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-42"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制："+$P{editor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="120"
						y="0"
						width="121"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-43">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["复核："+$P{auditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="241"
						y="0"
						width="121"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-44">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["审查："+$P{examinant}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="362"
						y="0"
						width="121"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-45">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
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