/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import OrderControl from './order-control';

/**
 * @todo docs and rename
 *
 * @param {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */
const queryFilter = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { name, isSelected } = props;
		if ( name !== 'core/query' || ! isSelected ) {
			return <BlockEdit key="edit" { ...props } />;
		}
		const { attributes, setAttributes } = props;
		const { query } = attributes;
		if ( 'wcb_session' !== query.postType ) {
			return <BlockEdit key="edit" { ...props } />;
		}

		const { order, orderBy } = query;
		const updateQuery = ( newQuery ) => setAttributes( { query: { ...query, ...newQuery } } );

		return (
			<>
				<BlockEdit key="edit" { ...props } />
				<InspectorControls>
					<PanelBody title={ __( 'Settings', 'wordcamporg' ) }>
						<OrderControl
							{ ...{ order, orderBy } }
							onChange={ updateQuery }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'withInspectorControls'
);

if ( !! window.WordCampBlocks[ 'hook-query' ] ) {
	addFilter( 'editor.BlockEdit', 'wordcamp/hook-query', queryFilter );
}
